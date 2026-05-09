import { Component, output } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'blog-toolbar',
  imports: [
    MatIcon
  ],
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
