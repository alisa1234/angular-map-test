import { Injectable } from '@angular/core';
import {eng_keys, ukr_keys} from "../../assets/localization-keys";

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  languagesList: string[] = ['eng', 'ukr'];
  selectedLanguage: string = '';

  constructor() {
    this.selectedLanguage = localStorage.getItem('language') || this.languagesList[0];
  }

  setSelectedLanguage(value: string) {
    this.selectedLanguage = value;
    localStorage.setItem('language', this.selectedLanguage);
  }
  translate(value: string): string {
    switch (this.selectedLanguage) {
      case 'eng':
        return eng_keys[value]
      case 'ukr':
        return ukr_keys[value]
      default:
        return '';
    }
  }
}
