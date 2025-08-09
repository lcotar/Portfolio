import { Component, AfterViewInit } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { CommonModule } from '@angular/common';
import { Project } from '../interfaces/projects.interface';
import { TranslateModule } from '@ngx-translate/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SingleProjectComponent, CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      projectname: 'Join',
      content: {
        projectname: 'Join',
        title: 'myProjects.join.title',
        technologies: 'HTML | CSS | Javascript',
        description: 'myProjects.join.description',
      },

      imageProject: ['/img/portfolio_projects/01_join.png'],
      github: 'https://github.com/johannesngl/join-main',
      livetest: 'https://join.leacotar.com/',
    },
    {
      projectname: 'Pollo Loco',
      content: {
        title: 'myProjects.polloLoco.title',
        technologies: 'HTML | CSS | Javascript',
        description: 'myProjects.polloLoco.description',
      },
      imageProject: ['/img/portfolio_projects/02_el_pollo_loco.png'],
      github: 'https://github.com/lcotar/El-Pollo-Loco',
      livetest: 'https://pollo-loco.leacotar.com/',
    },
  ];

  activeProject = this.projects[0];

  // projectnavbar: string[] = ['Join', 'Pollo Loco'];

  changeIndex(index: number) {
    this.activeProject = this.projects[index];
  }
}
