import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapPageComponent} from "./pages/map-page/map-page.component";
import {TablePageComponent} from "./pages/table-page/table-page.component";

const routes: Routes = [
  {path: '', component: MapPageComponent},
  {path: 'table', component: TablePageComponent},
  {path: 'map', redirectTo: '/', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
