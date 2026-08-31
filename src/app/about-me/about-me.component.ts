import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    imports: [CommonModule, TranslateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutMeLeftSide') aboutMeLeftSide!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      entry.target.classList.toggle('slideIn', entry.isIntersecting);
    }, { threshold: 0.2 });
    this.observer.observe(this.aboutMeLeftSide.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
