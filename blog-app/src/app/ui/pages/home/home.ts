import { Component, inject } from '@angular/core';

import { ARTICLES_FACADE_TOKEN } from '../../../services/articles-facade-service';
import { BlogArticle, HobbyCard } from '../../components';

import {
  ACHIEVEMENTS,
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
  protected readonly store = inject(ARTICLES_FACADE_TOKEN);

  protected readonly achievements = ACHIEVEMENTS;
  protected readonly hobbies = HOBBIES;
  protected readonly projects = PROJECTS;
  protected readonly skills = SKILLS;
}
