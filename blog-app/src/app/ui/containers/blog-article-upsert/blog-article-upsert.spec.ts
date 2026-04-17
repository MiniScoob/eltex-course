import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleUpsert } from './blog-article-upsert';

describe('BlogArticleUpsert', () => {
  let component: BlogArticleUpsert;
  let fixture: ComponentFixture<BlogArticleUpsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticleUpsert],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogArticleUpsert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
