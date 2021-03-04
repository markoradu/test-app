import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TournamentService } from '../tournaments.service';

@Component({
  selector: 'app-tournaments-filters',
  templateUrl: './tournaments-filters.component.html',
  styleUrls: ['./tournaments-filters.component.scss'],
})
export class TournamentsFiltersComponent implements OnInit {
  tournamentFinderForm!: FormGroup;
  faSearch = faSearch;
  faMinus = faMinus;
  faPlus = faPlus;
  searchByName$: Subject<any> = new Subject<string>();
  @Output() emitForm = new EventEmitter();
  @Output() resetFilters = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService
  ) {}

  get gameId_in(): FormArray | null {
    return this.tournamentFinderForm
      ? (this.tournamentFinderForm.controls['gameId.in'] as FormArray)
      : null;
  }

  ngOnInit(): void {
    this.searchByName$.pipe(debounceTime(400)).subscribe((name) => {
      this.submitForm(this.tournamentFinderForm);
    });
    this.initForm();
  }

  initForm(game: any = []): void {
    this.tournamentService.getGames().subscribe((result) => {
      game = result;
      this.tournamentFinderForm = this.fb.group({
        'gameId.in': this.populateForm(game),
        'name.contains': [''],
      });
    });
  }

  populateForm(game: any, name?: any): any {
    const arr: Array<any> = [];
    const items = game;

    items.forEach((element: object) => {
      arr.push(this.newFormItem(element, game, name));
    });

    return this.fb.array(arr);
  }

  newFormItem(item: any, game?: any, name?: string): FormGroup {
    let isChecked: boolean = false;

    if (game && item.id === game.id) {
      isChecked = true;
    }

    return this.fb.group({
      id: item.id,
      name: item.name,
      checked: isChecked,
      count: item.tournamentCount ? item.tournamentCount : null,
    });
  }
  removeEmpty(currentObject: Array<any>): object {
    const result: any = {};

    for (const key in currentObject) {
      if (currentObject.hasOwnProperty(key)) {
        if (
          currentObject[key] &&
          currentObject[key].length &&
          currentObject[key] !== 'default'
        ) {
          typeof currentObject[key] !== 'string'
            ? (result[key] = currentObject[key].join(','))
            : (result[key] = currentObject[key]);
        }
      }
    }

    return result;
  }

  extractChecked(formObj: any) {
    const tmpForm: any = {};

    for (const key in formObj) {
      if (formObj.hasOwnProperty(key) && formObj[key] != null) {
        const element = formObj[key];
        if (typeof element !== 'string' && typeof element !== 'number') {
          tmpForm[key] = [];

          element.map((elem: any) => {
            if (elem.checked) {
              tmpForm[key].push(elem.id);
            }
          });
        } else {
          tmpForm[key] = element.toString();
        }
      }
    }

    return tmpForm;
  }

  submitForm(form: any): void {
    let { value } = form;
    value = this.extractChecked(value);
    this.emitForm.next(this.removeEmpty(value));
  }

  resetForm(): void {
    this.initForm();
    this.resetFilters.emit(true);
  }
}
