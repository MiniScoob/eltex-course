import { afterRenderEffect, Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'blog-statistics',
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.module.scss',
})
export class Statistics {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

  protected isOpen = input<boolean>(false);
  protected blogArticlesCount = input.required<number>();
  protected blogCommentsCount = input.required<number>();

  protected close = output<void>();

  constructor() {
    afterRenderEffect(() => {
      if (this.isOpen()) {
        this.modalRef.nativeElement.showModal();
      } else {
        this.modalRef.nativeElement.close();
      }
    });
  }

  protected handleClose() {
    this.close.emit();
  }

  protected handleBackDropClick(e: MouseEvent) {
    console.log('backdrop');
    const isClickedOnBackDrop = e.target === e.currentTarget;

    if (isClickedOnBackDrop) {
      this.close.emit();
    }
  }
}
