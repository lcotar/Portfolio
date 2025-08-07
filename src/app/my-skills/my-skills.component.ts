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
  iconsFrondend: string[] = [
    '/img/skills/icons/10_html_icon.png',
    '/img/skills/icons/11_css_icon.png',
    '/img/skills/icons/06_javaScript_icon.png',

    '/img/skills/icons/12_typeScript_icon.png.png',
    '/img/skills/icons/15_angular_icon.png',
    '/img/skills/icons/07_firebase_icon.png',
    '/img/skills/icons/09_git_icon.png',
    '/img/skills/icons/13_restAPI_icon.png',
    '/img/skills/icons/08_scrum_icon.png',

    '/img/skills/icons/18_materialDesign_icon.png',
    '/img/skills/icons/16_continuallyLearning_icon.png',
    // '/img/skills/icons/.png',
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
