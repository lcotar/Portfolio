import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Project {
  projectname: string;
  content: {
    title: string;
    technologies: string;
    description: string;
  };
  imageProject: string[];
  github: string;
  livetest: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      projectname: 'Join',
      content: {
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
}
