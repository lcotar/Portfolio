import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarResponsivComponent } from './navbar-responsiv.component';

describe('NavbarResponsivComponent', () => {
  let component: NavbarResponsivComponent;
  let fixture: ComponentFixture<NavbarResponsivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarResponsivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarResponsivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
