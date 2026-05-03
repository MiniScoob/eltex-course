import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticlePreview } from './blog-article-preview';

describe('BlogArticle', () => {
  let component: BlogArticlePreview;
  let fixture: ComponentFixture<BlogArticlePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticlePreview],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogArticlePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
