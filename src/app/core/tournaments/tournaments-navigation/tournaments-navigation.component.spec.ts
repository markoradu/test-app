import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsNavigationComponent } from './tournaments-navigation.component';

describe('TournamentsNavigationComponent', () => {
  let component: TournamentsNavigationComponent;
  let fixture: ComponentFixture<TournamentsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
