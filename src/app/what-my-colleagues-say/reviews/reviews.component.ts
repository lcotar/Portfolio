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
  visibleDots: number[] = [];

  ngOnInit() {
    if (this.rezessionen && this.rezessionen.length > 0) {
      this.updateVisibleDots();
    }
  }

  nextReview() {
    if (this.rezessionen?.length) {
      this.currentIndex = (this.currentIndex + 1) % this.rezessionen.length;
      this.updateVisibleDots();
    }
  }

  prevReview() {
    if (this.rezessionen?.length) {
      this.currentIndex =
        (this.currentIndex - 1 + this.rezessionen.length) %
        this.rezessionen.length;
      this.updateVisibleDots();
    }
  }

  updateVisibleDots() {
    const total = this.rezessionen.length;

    // Fall 1: Weniger als 5 Feedbacks -> einfach alle Punkte in Reihenfolge
    if (total < 5) {
      this.visibleDots = Array.from({ length: total }, (_, i) => i);
      return;
    }

    // Fall 2: 5 oder mehr Feedbacks -> mittleren grünen simulieren
    const range = 2; // 2 links, 2 rechts
    this.visibleDots = [];

    for (let offset = -range; offset <= range; offset++) {
      let index = (this.currentIndex + offset + total) % total;
      this.visibleDots.push(index);
    }
  }

  isCenterDot(dotPos: number): boolean {
    const total = this.rezessionen.length;

    if (total === 1) {
      return true; // einziger Punkt ist grün
    }

    if (total === 2) {
      return this.visibleDots[dotPos] === this.currentIndex;
    }

    if (total === 3) {
      return dotPos === 1; // mittlerer Punkt
    }

    if (total === 4) {
      return dotPos === 2; // zweiter von rechts (Index 2)
    }

    // Bei >= 5 Feedbacks ist immer der mittlere Dot grün
    const centerPosition = Math.floor(this.visibleDots.length / 2);
    return dotPos === centerPosition;
  }
}
