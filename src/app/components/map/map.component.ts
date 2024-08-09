import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {LocationsService} from "../../services/locations.service";
import {filter, Observable} from "rxjs";
import {Location} from "../../types/locationDTO";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Output() selectedLocation: EventEmitter<Location> = new EventEmitter();
  markers: Observable<Location[]> = this.locationsService.locations.pipe(
    filter(Boolean));
  options: google.maps.MapOptions = {
    center: {lat: 35.1395, lng: 33.952},
    zoom: 8
  };
  markerClustererImagePath: string =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  constructor(private locationsService: LocationsService) { }

  getMarkerInfo(marker: Location) {
    this.selectedLocation.emit(marker);
  }
}
