import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-responsiv',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar-responsiv.component.html',
  styleUrl: './navbar-responsiv.component.scss',
})
export class NavbarResponsivComponent {
  currentLang: string = 'en';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toogleTranslation(languae: string) {
    this.translate.use(languae);
    const CURRENT_LANGUAGE = this.translate.currentLang;
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
}
