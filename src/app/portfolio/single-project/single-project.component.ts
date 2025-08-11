import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// import { Project } from '../../interfaces/projects.interface';
import { PortfolioComponent } from '../portfolio.component';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
})
export class SingleProjectComponent {
  @Input() project: any;

  @Input() reverseLayout: boolean = false;
}
