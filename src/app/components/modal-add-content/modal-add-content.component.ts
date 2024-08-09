import { Component } from '@angular/core';
import {Options} from "../../services/modal.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PipesModule} from "../../pipes/pipes.module";

@Component({
  selector: 'app-modal-add-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    PipesModule
  ],
  templateUrl: './modal-add-content.component.html',
  styleUrl: './modal-add-content.component.scss'
})
export class ModalAddContentComponent {
  options?: Options;
  form: FormGroup = new FormGroup<any>({
    name: new FormControl('', Validators.required),
    lat: new FormControl(
      null,
      [
        Validators.min(-180),
        Validators.max(180),
        Validators.required
      ]
    ),
    lng: new FormControl(
      null,
      [
        Validators.min(-90),
        Validators.max(90),
        Validators.required
      ]
    )
  })

  onSuccess() {
    this.options?.events?.onSuccess(this.form.value);
  }

  onClose() {
    this.options?.events?.onClose();
  }
}
