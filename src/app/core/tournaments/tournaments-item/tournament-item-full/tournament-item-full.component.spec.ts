import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentItemFullComponent } from './tournament-item-full.component';

describe('TournamentItemFullComponent', () => {
  let component: TournamentItemFullComponent;
  let fixture: ComponentFixture<TournamentItemFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentItemFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentItemFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
