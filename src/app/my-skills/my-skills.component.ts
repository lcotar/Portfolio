import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  iconsFrondend = [
    {
      name: 'HTML',
      srcDefault: '/img/skills/icons/10_html_icon.png',
      srcHover: '/img/skills/hover_icons/10_html_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'CSS',
      srcDefault: '/img/skills/icons/11_css_icon.png',
      srcHover: '/img/skills/hover_icons/11_css_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'JavaScript',
      srcDefault: '/img/skills/icons/06_javaScript_icon.png',
      srcHover: '/img/skills/hover_icons/06_javaScript_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'TypeScript',
      srcDefault: '/img/skills/icons/12_typeScript_icon.png',
      srcHover: '/img/skills/hover_icons/12_typeScript_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Angular',
      srcDefault: '/img/skills/icons/15_angular_icon.png',
      srcHover: '/img/skills/hover_icons/15_angular_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Firebase',
      srcDefault: '/img/skills/icons/07_firebase_icon.png',
      srcHover: '/img/skills/hover_icons/07_firebase_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Git',
      srcDefault: '/img/skills/icons/09_git_icon.png',
      srcHover: '/img/skills/hover_icons/09_git_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Rest API',
      srcDefault: '/img/skills/icons/13_restAPI_icon.png',
      srcHover: '/img/skills/hover_icons/13_restAPI_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Scrum',
      srcDefault: '/img/skills/icons/08_scrum_icon.png',
      srcHover: '/img/skills/hover_icons/08_scrum_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Material Design',
      srcDefault: '/img/skills/icons/18_materialDesign_icon.png',
      srcHover: '/img/skills/hover_icons/18_materialDesign_icon_hover.png',
      isHovered: false,
    },
    {
      name: 'Continuous Learning',
      srcDefault: '/img/skills/icons/16_continuallyLearning_icon.png',
      srcHover: '/img/skills/icons/16_continuallyLearning_icon.png',
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
