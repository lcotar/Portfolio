import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatMyColleaguesSayComponent } from './what-my-colleagues-say.component';

describe('WhatMyColleaguesSayComponent', () => {
  let component: WhatMyColleaguesSayComponent;
  let fixture: ComponentFixture<WhatMyColleaguesSayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatMyColleaguesSayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatMyColleaguesSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
