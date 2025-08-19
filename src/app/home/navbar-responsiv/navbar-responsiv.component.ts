import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-responsiv',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-responsiv.component.html',
  styleUrl: './navbar-responsiv.component.scss',
})
export class NavbarResponsivComponent {}
