import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
import { GoogleMapsModule } from "@angular/google-maps";
import {CommonModule} from "@angular/common";
import { MapPageComponent } from './pages/map-page/map-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { LocationInfoComponent } from './components/location-info/location-info.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModule} from "./pipes/pipes.module";
import {PaginationComponent} from "./components/pagination/pagination.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    TableComponent,
    MapPageComponent,
    TablePageComponent,
    LocationInfoComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FontAwesomeModule,
    FormsModule,
    PipesModule,
    PaginationComponent
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
