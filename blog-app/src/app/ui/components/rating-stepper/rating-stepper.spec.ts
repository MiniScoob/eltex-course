import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStepper } from './rating-stepper';

describe('RatingStepper', () => {
  let component: RatingStepper;
  let fixture: ComponentFixture<RatingStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
