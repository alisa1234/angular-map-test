import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {LocalizationService} from "../../services/localization.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: FormControl<string> = new FormControl();

  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {
    this.selectedLanguage.setValue(this.localizationService.selectedLanguage ? this.localizationService.selectedLanguage : 'eng');
    this.selectedLanguage.valueChanges.subscribe(value => {
      this.selectLanguage(value as string);
    })
  }

  selectLanguage(value: string) {
    this.localizationService.setSelectedLanguage(value);
  }
}
