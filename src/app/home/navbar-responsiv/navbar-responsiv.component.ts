import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar-responsiv',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './navbar-responsiv.component.html',
    styleUrl: './navbar-responsiv.component.scss'
})
export class NavbarResponsivComponent {
  currentLang: string = 'en';
  constructor(private translate: TranslateService, private router: Router) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toogleTranslation(languae: string) {
    this.translate.use(languae);
    this.currentLang = languae;
    document.documentElement.lang = languae;
  }

  /* isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  } */

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();
    this.toggleMenu();

    const performScroll = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const navbarHeight =
        document.querySelector('.topnav')?.getBoundingClientRect().height ?? 0;
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
