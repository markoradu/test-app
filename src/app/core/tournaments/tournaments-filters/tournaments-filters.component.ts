import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments-filters',
  templateUrl: './tournaments-filters.component.html',
  styleUrls: ['./tournaments-filters.component.scss'],
})
export class TournamentsFiltersComponent implements OnInit {
  tournamentFinderForm!: FormGroup;
  faSearch = faSearch;
  searchByName$: Subject<any> = new Subject<string>();
  @Output() emitForm = new EventEmitter();
  @Output() resetFilters = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchByName$.pipe(debounceTime(400)).subscribe((name) => {
      this.submitForm(this.tournamentFinderForm);
    });
    this.initForm();
  }

  initForm(): void {
    this.tournamentFinderForm = this.fb.group({
      'name.contains': [''],
    });
  }

  submitForm(form: any): void {
    let { value } = form;
    this.emitForm.next(value);
  }

  resetForm(): void {
    this.initForm();
    this.resetFilters.emit();
  }
}
