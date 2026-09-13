import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wholeSkillsCTN') wholeSkillsCTN!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle('inView', entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    this.observer.observe(this.wholeSkillsCTN.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  iconsFrondend = [
    {
      name: 'HTML',
      srcDefault: '/img/skills/icons/01 Frontend/10_html.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/10_html_hover.png',
      isHovered: false,
    },
    {
      name: 'CSS',
      srcDefault: '/img/skills/icons/01 Frontend/11_css.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/11_css_hover.png',
      isHovered: false,
    },
    {
      name: 'JavaScript',
      srcDefault: '/img/skills/icons/01 Frontend/06_javaScript.png',
      srcHover:
        '/img/skills/icons/01 Frontend/01_hover/06_javaScript_hover.png',
      isHovered: false,
    },
    {
      name: 'TypeScript',
      srcDefault: '/img/skills/icons/01 Frontend/12_TypeScript.png',
      srcHover:
        '/img/skills/icons/01 Frontend/01_hover/12_TypeScript_hover.png',
      isHovered: false,
    },
    {
      name: 'Angular',
      srcDefault: '/img/skills/icons/01 Frontend/15_angular.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/15_angular_hover.png',
      isHovered: false,
    },
    {
      name: 'Firebase',
      srcDefault: '/img/skills/icons/01 Frontend/07_firebase.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/07_firebase_hover.png',
      isHovered: false,
    },
    {
      name: 'Git',
      srcDefault: '/img/skills/icons/01 Frontend/09_git.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/09_git_hover.png',
      isHovered: false,
    },
    {
      name: 'Rest API',
      srcDefault: '/img/skills/icons/01 Frontend/13_restAPI.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/13_restAPI_hover.png',
      isHovered: false,
    },
    {
      name: 'Scrum',
      srcDefault: '/img/skills/icons/01 Frontend/08_scrum.png',
      srcHover: '/img/skills/icons/01 Frontend/01_hover/08_scrum_hover.png',
      isHovered: false,
    },
    {
      name: 'Material Design',
      srcDefault: '/img/skills/icons/01 Frontend/18_materialDesign.png',
      srcHover:
        '/img/skills/icons/01 Frontend/01_hover/18_materialDesign_hover.png',
      isHovered: false,
    },
    {
      name: 'Continuous Learning',
      srcDefault: '/img/skills/icons/01 Frontend/16_continuallyLearning.png',
      srcHover:
        '/img/skills/icons/01 Frontend/01_hover/16_continuallyLearning.png',
      isHovered: false,
    },
  ];

  /* iconsBackend:string[] =
  [
    '/img/myskills/nodejs.png',
    '/img/myskills/express.png',
    '/img/myskills/mongodb.png',
    '/img/myskills/mysql.png',
    '/img/myskills/postgresql.png',
    '/img/myskills/docker.png',
    '/img/myskills/aws.png',
    '/img/myskills/azure.png'
  ] */
}
