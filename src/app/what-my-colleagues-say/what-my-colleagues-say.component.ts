import { Component } from '@angular/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Reviews } from '../interfaces/rezession.interface';

@Component({
  selector: 'app-what-my-colleagues-say',
  standalone: true,
  imports: [ReviewsComponent, CommonModule, TranslateModule],
  templateUrl: './what-my-colleagues-say.component.html',
  styleUrl: './what-my-colleagues-say.component.scss',
})
export class WhatMyColleaguesSayComponent {
  review: Reviews[] = [
    {
      name: 'whatMyColleguasSay.teamPlayer.florian.name',
      project: 'whatMyColleguasSay.teamPlayer.florian.project',
      review: 'whatMyColleguasSay.teamPlayer.florian.feedback',
      linkedin: 'https://www.linkedin.com/in/florian-zunke-b18420328/',
    },
    {
      name: 'whatMyColleguasSay.teamPlayer.kai.name',
      project: 'whatMyColleguasSay.teamPlayer.kai.project',
      review: 'whatMyColleguasSay.teamPlayer.kai.feedback',
      linkedin: 'https://www.linkedin.com/in/kai-schulz-53207b1a6/',
    },
  ];
}
