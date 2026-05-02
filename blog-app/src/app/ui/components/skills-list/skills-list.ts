import { Component, input } from '@angular/core';

import type { Skill } from './skills-list.model';

@Component({
  selector: 'home-skills-list',
  imports: [],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.scss',
})
export class SkillsList {
  skills = input.required<Skill[]>();
}
