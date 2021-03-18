import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfPostsComponent } from './tf-posts.component';

describe('TfPostsComponent', () => {
  let component: TfPostsComponent;
  let fixture: ComponentFixture<TfPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
