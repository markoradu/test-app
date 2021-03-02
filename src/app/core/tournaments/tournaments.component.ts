import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DisplayFilters } from 'src/app/shared/enums/display.enum';
import { TournamentService } from './tournaments.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  tournaments$!: Observable<{ items: any[]; totalAmountOfItems: number }>;
  page = 1;
  size = 3;
  displayFilters = DisplayFilters;
  layout = this.displayFilters.Basic;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(term?: any): void {
    const filters = { page: this.page - 1, size: this.size };
    let search = { ...term, ...filters };
    this.tournaments$ = this.tournamentService.getTournaments(search).pipe(
      map((tournaments: any) => {
        return {
          items: tournaments.body,
          totalAmountOfItems: tournaments.headers?.get('X-Total-Count'),
        };
      })
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getData();
  }

  changeLayout($event: any): void {
    this.layout = $event;
  }

  collectForm(form: any): void {
    this.getData(form);
  }

  reset() {
    this.getData();
  }
}
