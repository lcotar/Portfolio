import { Component } from '@angular/core';

import { HomeComponent } from '../home/home.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { WhatMyColleaguesSayComponent } from '../what-my-colleagues-say/what-my-colleagues-say.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HomeComponent,
    AboutMeComponent,
    MySkillsComponent,
    PortfolioComponent,
    WhatMyColleaguesSayComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
