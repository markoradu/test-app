import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfMyPostsModalComponent } from './tf-my-posts-modal.component';

describe('TfMyPostsModalComponent', () => {
  let component: TfMyPostsModalComponent;
  let fixture: ComponentFixture<TfMyPostsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfMyPostsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfMyPostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
