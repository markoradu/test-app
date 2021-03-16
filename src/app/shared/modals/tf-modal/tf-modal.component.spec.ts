import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfModalComponent } from './tf-modal.component';

describe('TfModalComponent', () => {
  let component: TfModalComponent;
  let fixture: ComponentFixture<TfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
