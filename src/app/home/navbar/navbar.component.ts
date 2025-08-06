import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentLang: string = 'en';
  constructor(private translate: TranslateService) {}

  toogleTranslation(languae: string) {
    this.translate.use(languae);
    this.currentLang = this.translate.currentLang;
  }
}
