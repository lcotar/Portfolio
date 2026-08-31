import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../interfaces/projects.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wholePortfolioCNT') wholePortfolioCNT!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle('inView', entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    this.observer.observe(this.wholePortfolioCNT.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  projects: Project[] = [
    {
      projectname: 'Join',
      content: {
        title: 'myProjects.join.title',
        technologies: 'HTML | CSS | JavaScript',
        description: 'myProjects.join.description',
      },
      imageProject: ['/img/portfolio_projects/01_join.png'],
      github: 'https://github.com/lcotar/join',
      livetest: 'https://join.leacotar.com/',
    },
    {
      projectname: 'Pollo Loco',
      content: {
        title: 'myProjects.polloLoco.title',
        technologies: 'HTML | CSS | JavaScript',
        description: 'myProjects.polloLoco.description',
      },
      imageProject: ['/img/portfolio_projects/02_el_pollo_loco.png'],
      github: 'https://github.com/lcotar/El-Pollo-Loco',
      livetest: 'https://el-pollo-loco.leacotar.com/',
    },
  ];
}
