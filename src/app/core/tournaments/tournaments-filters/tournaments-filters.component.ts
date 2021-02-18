import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentsFilters } from 'src/app/shared/enums/tournaments.enum';

@Component({
  selector: 'app-tournaments-filters',
  templateUrl: './tournaments-filters.component.html',
  styleUrls: ['./tournaments-filters.component.scss']
})
export class TournamentsFiltersComponent implements OnInit {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.filterForm = this.fb.group({
      [TournamentsFilters.Organizer]: this.fb.array([]),
      [TournamentsFilters.Game]: this.fb.array([]),
      [TournamentsFilters.Type]: this.fb.array([]),
    })
  }

}
