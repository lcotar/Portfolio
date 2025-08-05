import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { FooterComponent } from './shared/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as AOS from 'aos';
import { NavbarComponent } from './home/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, TranslateModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private translate: TranslateService, public router: Router) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  ngOnInit() {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
