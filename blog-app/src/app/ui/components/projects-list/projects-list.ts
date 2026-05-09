import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import type { Project } from './projects-list.model';

@Component({
  selector: 'home-projects-list',
  imports: [
    MatIcon,
  ],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.module.scss',
})
export class ProjectsList {
  projects = input.required<Project[]>();
}
