import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalizationPipe} from "./localization.pipe";

@NgModule({
  declarations: [
    LocalizationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [LocalizationPipe]
})
export class PipesModule { }
