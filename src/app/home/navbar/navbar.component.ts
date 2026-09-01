import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentLang: string = 'en';
  constructor(private translate: TranslateService) {}

  toogleTranslation(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    document.documentElement.lang = language;
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const navbarHeight =
      document.querySelector('.navbarCNT')?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  }
}
