import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyCard } from './hobby-card';

describe('HobbyCard', () => {
  let component: HobbyCard;
  let fixture: ComponentFixture<HobbyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HobbyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
