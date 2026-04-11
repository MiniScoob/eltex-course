import { Component } from '@angular/core';

import { HobbyCard } from '../../components';

import {
  ACHIEVEMENTS,
  ARTICLES,
  HOBBIES,
  MONTHS_ENUM,
  PROJECTS,
  SKILLS
} from './constants';

@Component({
  selector: 'app-home',
  imports: [HobbyCard],
  templateUrl: './home.html',
  styleUrl: './home.module.scss',
})
export class Home {
  public readonly achievements = ACHIEVEMENTS;
  public readonly articles = ARTICLES;
  public readonly hobbies = HOBBIES;
  public readonly projects = PROJECTS;
  public readonly skills = SKILLS;

  public toDateString(datetime: string) {
    const date = new Date(datetime);

    return `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }
}
