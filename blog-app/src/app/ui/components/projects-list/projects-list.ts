import { Component, input } from '@angular/core';

import type { Project } from './projects-list.model';

@Component({
  selector: 'home-projects-list',
  imports: [],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.module.scss',
})
export class ProjectsList {
  projects = input.required<Project[]>();
}
