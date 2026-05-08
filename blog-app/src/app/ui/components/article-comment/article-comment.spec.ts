import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComment } from './article-comment';

describe('ArticleComment', () => {
  let component: ArticleComment;
  let fixture: ComponentFixture<ArticleComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleComment],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
