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

  getData(): void {
    const filters = { page: this.page - 1, size: this.size };
    this.tournaments$ = this.tournamentService.getTournaments(filters).pipe(
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
    console.log(this.layout);
    this.getData();
  }

  changeLayout($event: any) {
    this.layout = $event;
  }
}
