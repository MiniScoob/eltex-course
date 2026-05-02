import {Component, input} from '@angular/core';
import {ACHIEVEMENTS} from '../../pages/home/home.constants';

@Component({
  selector: 'home-achievements-list',
  imports: [],
  templateUrl: './achievements-list.html',
  styleUrl: './achievements-list.module.scss',
})
export class AchievementsList {
  achievements = input.required<string[]>()
}
