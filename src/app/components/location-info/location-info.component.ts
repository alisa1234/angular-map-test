import {Component, EventEmitter, Input, Output} from "@angular/core";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {Location} from "../../types/locationDTO";

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent {
  @Input() location?: Location;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  protected readonly faXmark = faXmark;

  constructor() { }

  closeInfo() {
    this.onClose.emit();
  }
}
