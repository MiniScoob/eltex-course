import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsList } from './achievements-list';

describe('AchivementsList', () => {
  let component: AchievementsList;
  let fixture: ComponentFixture<AchievementsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsList],
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
