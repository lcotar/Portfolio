import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentLang: string = 'en';
  constructor(private translate: TranslateService, private router: Router) {}

  toogleTranslation(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    document.documentElement.lang = language;
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();

    const performScroll = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const navbarHeight =
        document.querySelector('.navbarCNT')?.getBoundingClientRect().height ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    };

    if (this.router.url !== '/') {
      // Die Navbar sitzt ausserhalb des router-outlet und bleibt beim
      // Routenwechsel bestehen - die Zielsektionen (#aboutme usw.) existieren
      // aber nur auf der Startseite. Von Imprint/Privacy aus also erst dahin
      // navigieren, dann (nach dem Rendern) scrollen.
      this.router.navigate(['/']).then(() => setTimeout(performScroll, 0));
    } else {
      performScroll();
    }
  }
}
