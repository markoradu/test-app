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

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.searchByName$.pipe(debounceTime(300)).subscribe((name) => {
      this.submitForm(this.tournamentFinderForm);
    });
  }

  initForm() {
    this.tournamentFinderForm = this.fb.group({
      'name.contains': [''],
    });
  }

  submitForm(form: any): void {
    this.emitForm.next(form.value);
  }

  resetForm(): void {
    this.initForm();
  }
}
