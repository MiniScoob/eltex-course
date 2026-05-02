import {
  Component,
  input,
  OnChanges,
  output,
  signal
} from '@angular/core';

import type { PaginationItem } from './pagination.model';

@Component({
  selector: 'list-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.module.scss',
})
export class Pagination implements OnChanges {
  public currentPage = input<number>(1);
  public rangeDisplayed = input<number>(3);
  public totalPages = input.required<number>();

  public pageChange = output<number>();

  protected pageItems = signal<PaginationItem[]>([]);

  protected updatePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages()) {
      return;
    }

    this.pageChange.emit(newPage);
  }

  ngOnChanges() {
    this.pageItems.set(this.generatePages());
  }

  private generatePages(): PaginationItem[] {
    if (this.totalPages() <= 1) {
      return [];
    }

    const pages: PaginationItem[] = [];
    const half = Math.floor(this.rangeDisplayed() / 2);

    let start = Math.max(1, this.currentPage() - half);
    const end = Math.min(this.totalPages(), start + this.rangeDisplayed() - 1);

    if (end - start + 1 < this.rangeDisplayed()) {
      start = Math.max(1, end - this.rangeDisplayed() + 1);
    }

    if (start > 1) {
      pages.push({ type: 'page', value: 1 });

      if (start > 2) {
        pages.push({ type: 'ellipsis' });
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push({ type: 'page', value: i });
    }

    if (end < this.totalPages()) {
      if (end < this.totalPages() - 1) {
        pages.push({ type: 'ellipsis' });
      }

      pages.push({ type: 'page', value: this.totalPages() });
    }

    return pages;
  }
}
