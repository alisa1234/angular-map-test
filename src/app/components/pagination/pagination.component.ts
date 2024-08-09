import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pages: number[] = [];
  @Output() selectedPage$: EventEmitter<number> = new EventEmitter<number>();
  selectedPage: number = 1;

  isShowFirstPage(page: number): boolean {
    return this.selectedPage !== 1 && page === this.selectedPage - 2;
  }
  isShowPrevDots(page: number): boolean {
    return page === this.selectedPage - 2;
  }
  isShowNextDots(page: number): boolean {
    return page === this.selectedPage + 2 &&
      this.selectedPage + 3 !== this.pages.length &&
      this.selectedPage + 3 <= this.pages.length;
  }
  isShowMainPages(page: number): boolean {
    return this.selectedPage === page ||
    (page === this.selectedPage + 1 || page === this.selectedPage + 2) ||
    (page === this.selectedPage - 1 || page === this.selectedPage - 2 && page !== 1);
  }
  isShowLastPage(page: number): boolean {
    return page === this.pages.length &&
      page !== this.selectedPage + 2 &&
      page !== this.selectedPage + 1 &&
      this.selectedPage !== page;
  }
  getSelectedPage(page: number) {
    this.selectedPage = page;
    this.selectedPage$.emit(page);
  }
}
