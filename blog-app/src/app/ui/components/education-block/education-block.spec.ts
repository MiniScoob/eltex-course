import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationBlock } from './education-block';

describe('Education', () => {
  let component: EducationBlock;
  let fixture: ComponentFixture<EducationBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
