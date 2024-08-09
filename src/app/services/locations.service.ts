import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Location, LocationDTO} from "../types/locationDTO";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locations: BehaviorSubject<Location[] | undefined> = new BehaviorSubject<Location[] | undefined>(undefined);

  constructor() {
    const locations: string | null = localStorage.getItem('locations')
    if (!locations) {
      this.getLocationsLocal().then();
    } else {
      this.locations.next(JSON.parse(locations));
    }
  }

  async getLocationsLocal() {
    await fetch('../../assets/locations-big.json')
      .then(response => response.json())
      .then((data: LocationDTO[]) => {
        const locations: Location[] = data.map((item: LocationDTO) => {
          return {
            position: {
              lat: item.coordinates[0],
              lng: item.coordinates[1]
            },
            name: item.name
          }
        });
          this.setLocationsToStorage(locations);
          this.locations.next(locations);
      }
      )
      .catch(err => console.log('Error'))
  }
  sort(order: 'ASC' | 'DSC') {
    let sortedLocations = this.locations.value?.sort(function (a, b) {
      if (a.name < b.name) {
        return order === 'ASC' ? -1 : 1;
      }
      if (a.name > b.name) {
        return order === 'ASC' ? 1 : -1;
      }
      return 0;
    });
    this.locations.next(sortedLocations);
  }
  edit() {
    this.locations.next(this.locations.value);
    this.setLocationsToStorage(this.locations.value);
  }
  delete(index: number) {
    const locations = [...(this.locations.value || [])];
    locations?.splice(index, 1);
    this.locations.next(locations);
    this.setLocationsToStorage(locations);
  }
  private setLocationsToStorage(locations: Location[] | undefined) {
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  add(data: {name: string, position: {lat: number, lng: number}}) {
    let locations: Location[] = [...(this.locations.value as Location[])];
    locations.push(data);
    this.locations.next(locations);
    this.setLocationsToStorage(locations);
  }
}
