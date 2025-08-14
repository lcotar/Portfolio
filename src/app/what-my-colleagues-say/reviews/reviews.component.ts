import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Reviews } from '../../interfaces/rezession.interface';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  @Input() rezessionen!: Reviews[];

  currentIndex: number = 0;

  nextReview() {
    if (this.rezessionen) {
      this.currentIndex = (this.currentIndex + 1) % this.rezessionen.length;
    }
  }

  prevReview() {
    if (this.rezessionen) {
      this.currentIndex =
        (this.currentIndex - 1 + this.rezessionen.length) %
        this.rezessionen.length;
    }
  }
}
