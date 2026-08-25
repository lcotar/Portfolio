import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Reviews } from '../../interfaces/rezession.interface';

@Component({
    selector: 'app-reviews',
    imports: [CommonModule, TranslateModule],
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
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
    this.visibleDots = this.buildCenteredDots(total, 2);
  }

  private buildCenteredDots(total: number, range: number): number[] {
    const dots: number[] = [];
    for (let offset = -range; offset <= range; offset++) {
      const index = (this.currentIndex + offset + total) % total;
      dots.push(index);
    }
    return dots;
  }

  isCenterDot(dotPos: number): boolean {
    const total = this.rezessionen.length;

    if (total === 2) {
      return this.visibleDots[dotPos] === this.currentIndex;
    }

    // Feste "mittlere" Position je nach Anzahl der Punkte (1/3/4 Feedbacks)
    const fixedCenter: Record<number, number> = { 1: 0, 3: 1, 4: 2 };
    if (total in fixedCenter) {
      return dotPos === fixedCenter[total];
    }

    // Bei >= 5 Feedbacks ist immer der mittlere Dot grün
    const centerPosition = Math.floor(this.visibleDots.length / 2);
    return dotPos === centerPosition;
  }
}
