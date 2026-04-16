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
  public readonly achievements = ACHIEVEMENTS;
  public readonly articles = ARTICLES;
  public readonly hobbies = HOBBIES;
  public readonly projects = PROJECTS;
  public readonly skills = SKILLS;
}
