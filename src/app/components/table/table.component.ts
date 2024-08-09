import { Component, OnInit } from '@angular/core';
import {faSortUp, faSortDown, faPencil, faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {LocationsService} from "../../services/locations.service";
import {filter, Observable, tap} from "rxjs";
import {Location} from "../../types/locationDTO";
import {ModalService} from "../../services/modal.service";
import {ModalDeleteContentComponent} from "../modal-delete-content/modal-delete-content.component";
import {FormControl} from "@angular/forms";
import {ModalAddContentComponent} from "../modal-add-content/modal-add-content.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  protected readonly faSortUp = faSortUp;
  protected readonly faSortDown = faSortDown;
  protected readonly faPencil = faPencil;
  protected readonly faCheck = faCheck;
  protected readonly faTrash = faTrash;
  order: 'ASC' | 'DSC' = 'ASC';
  totalItems: number = 0;
  locations: Observable<Location[]> = this.locationsService.locations.pipe(
    filter(Boolean),
    tap((locations: Location[]) => {
      this.totalItems = locations.length;
      this.calculatePagination();
    }));
  editableArr: Record<number, boolean> = {};
  pages: number[] = [];
  selectedPage: number  = 1;
  itemsOnPage: FormControl<number> = new FormControl(10) as FormControl<number>;

  constructor(private locationsService: LocationsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.itemsOnPage.valueChanges.subscribe(() => {
      this.calculatePagination()
    })
  }
  sort(order: 'ASC' | 'DSC') {
    this.order = order;
    this.locationsService.sort(order);
  }

  edit(index: number) {
    this.editableArr[index] = true;
  }
  save(index: number) {
    this.editableArr[index] = false;
    this.locationsService.edit();
  }

  openModalDelete(data: {name: string, index: number}) {
    this.modalService.open(ModalDeleteContentComponent, {
      data: data,
      events: {
        onSuccess: () => this.deleteLocation(data.index),
        onClose: () => this.close()
      },
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.3s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }
  openModalAdd() {
    this.modalService.open(ModalAddContentComponent, {
      events: {
        onSuccess: (data: any) => this.addLocation(data),
        onClose: () => this.close()
      },
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.3s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }
  close() {
    this.modalService.close();
  }

  deleteLocation(index: number) {
    this.locationsService.delete(index);
    this.close();
  }

  getPageResult(page: number) {
    this.selectedPage = page;
  }
  private calculatePagination() {
    const result = Math.ceil(this.totalItems / this.itemsOnPage.value);
    let arr = [];
    for (let i = 0; i < result; i++) {
      arr.push(i + 1);
    }
    this.pages = arr;
  }

  private addLocation(data: {name: string, lat: number, lng: number}) {
    let preparedData = {
      name: data.name,
      position: {
        lat: data.lat,
        lng: data.lng
      }
    }
    this.locationsService.add(preparedData);
    this.close();
  }
}
