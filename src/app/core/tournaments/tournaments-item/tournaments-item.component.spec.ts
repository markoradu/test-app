import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsItemComponent } from './tournaments-item.component';

describe('TournamentsItemComponent', () => {
  let component: TournamentsItemComponent;
  let fixture: ComponentFixture<TournamentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
