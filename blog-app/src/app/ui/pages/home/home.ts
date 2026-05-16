import { Component, inject } from '@angular/core';

import { ARTICLES_STORE_TOKEN } from '../../../services/articles-store-service';
import {
  AboutMe,
  AchievementsList,
  BlogArticlePreview,
  EducationsList,
  HobbyCard,
  ProjectsList,
  SkillsList
} from '../../components';

import {
  ACHIEVEMENTS,
  EDUCATIONS,
  HOBBIES,
  PROJECTS,
  SKILLS
} from './home.constants';

@Component({
  selector: 'app-home',
  imports: [
    AboutMe,
    BlogArticlePreview,
    HobbyCard,
    EducationsList,
    SkillsList,
    ProjectsList,
    AchievementsList,
  ],
  templateUrl: './home.html',
  styleUrl: './home.module.scss',
})
export class Home {
  protected readonly store = inject(ARTICLES_STORE_TOKEN);

  protected readonly achievements = ACHIEVEMENTS;
  protected readonly hobbies = HOBBIES;
  protected readonly projects = PROJECTS;
  protected readonly educations = EDUCATIONS;
  protected readonly skills = SKILLS;
}
