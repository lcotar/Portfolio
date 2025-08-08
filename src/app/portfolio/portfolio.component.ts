import { Component, AfterViewInit } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { CommonModule } from '@angular/common';
import { Project } from '../interfaces/projects.interface';
import { TranslateModule } from '@ngx-translate/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SingleProjectComponent, CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {}
