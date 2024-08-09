import { Component} from '@angular/core';
import {Location} from "../../types/locationDTO";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  showInfo: boolean = false;
  selectedLocation?: Location | undefined;
  constructor() { }

  getSelectedLocation(location: Location) {
    this.selectedLocation = location;
  }

  onClose() {
    delete this.selectedLocation;
  }
}
