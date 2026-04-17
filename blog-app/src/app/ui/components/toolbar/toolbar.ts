import { Component, output } from '@angular/core';

@Component({
  selector: 'blog-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.module.scss',
})
export class Toolbar {
  protected showAddForm = output<void>();
  protected showStatistic = output<void>();

  protected handleShowAddFormClick() {
    this.showAddForm.emit();
  }

  protected handleShowStatisticClick() {
    this.showStatistic.emit();
  }
}
