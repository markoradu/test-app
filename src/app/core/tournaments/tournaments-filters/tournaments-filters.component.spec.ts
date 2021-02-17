import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsFiltersComponent } from './tournaments-filters.component';

describe('TournamentsFiltersComponent', () => {
  let component: TournamentsFiltersComponent;
  let fixture: ComponentFixture<TournamentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
