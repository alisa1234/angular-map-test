import {Component} from "@angular/core";
import {ModalContent, Options} from "../../services/modal.service";
import {PipesModule} from "../../pipes/pipes.module";

@Component({
  selector: 'app-modal-delete-content',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './modal-delete-content.component.html',
  styleUrl: './modal-delete-content.component.scss'
})
export class ModalDeleteContentComponent implements ModalContent{
  options?: Options;

  constructor() {
  }

  onSuccess() {
    this.options?.events?.onSuccess(true);
  }

  onClose() {
    this.options?.events?.onClose();
  }
}
