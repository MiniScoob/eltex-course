import { Component } from '@angular/core';

import { BlogArticle, HobbyCard } from '../../components';

import {
  ACHIEVEMENTS,
  ARTICLES,
  HOBBIES,
  PROJECTS,
  SKILLS
} from './home.constants';

@Component({
  selector: 'app-home',
  imports: [BlogArticle, HobbyCard],
  templateUrl: './home.html',
  styleUrl: './home.module.scss',
})
export class Home {
  protected readonly achievements = ACHIEVEMENTS;
  protected readonly articles = ARTICLES;
  protected readonly hobbies = HOBBIES;
  protected readonly projects = PROJECTS;
  protected readonly skills = SKILLS;
}
