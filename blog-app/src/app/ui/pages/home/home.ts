import { Component, inject } from '@angular/core';

import { ARTICLES_FACADE_TOKEN } from '../../../services/articles-facade-service';
import {
  AboutMe,
  AchievementsList,
  BlogArticle,
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
  imports: [AboutMe, BlogArticle, HobbyCard, EducationsList, SkillsList, ProjectsList, AchievementsList],
  templateUrl: './home.html',
  styleUrl: './home.module.scss',
})
export class Home {
  protected readonly store = inject(ARTICLES_FACADE_TOKEN);

  protected readonly achievements = ACHIEVEMENTS;
  protected readonly hobbies = HOBBIES;
  protected readonly projects = PROJECTS;
  protected readonly educations = EDUCATIONS;
  protected readonly skills = SKILLS;
}
