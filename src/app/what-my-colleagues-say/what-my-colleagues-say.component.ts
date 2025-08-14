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
      name: 'whatMyColleguasSay.teamPlayer.johannes.name',
      project: 'whatMyColleguasSay.teamPlayer.johannes.project',
      review: 'whatMyColleguasSay.teamPlayer.johannes.feedback',
      linkedin:
        'https://www.linkedin.com/in/johannes-singl-1920aa33b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B7WWBSp%2FlQiKur%2F3sspBeGg%3D%3D',
    },
    {
      name: 'whatMyColleguasSay.teamPlayer.test.name',
      project: 'whatMyColleguasSay.teamPlayer.test.project',
      review: 'whatMyColleguasSay.teamPlayer.test.feedback',
      linkedin:
        'https://www.linkedin.com/in/leacotar?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtUFWNKPoS5u1HIt39aq7Ig%3D%3D',
    },
  ];
}

/*
        "name": "Test Test",
        "project": "Join",
        "feedback": "Test Feedback",
        "linkedin": "https://www.linkedin.com/in/leacotar?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtUFWNKPoS5u1HIt39aq7Ig%3D%3D"
*/
