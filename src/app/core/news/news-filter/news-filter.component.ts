import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss'],
})
export class NewsFilterComponent implements OnInit {
  @Output() emitForm = new EventEmitter();
  newsFinderForm!: FormGroup;
  faMinus = faMinus;
  faPlus = faPlus;

  constructor(private newsService: NewsService, private fb: FormBuilder) {}

  get gamesId_in(): FormArray | null {
    return this.newsFinderForm
      ? (this.newsFinderForm.controls['gamesId.in'] as FormArray)
      : null;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(game: any = []): void {
    this.newsService.getGames().subscribe((result) => {
      game = result;
      this.newsFinderForm = this.fb.group({
        'gamesId.in': this.populateForm(game),
      });
    });
  }

  populateForm(game: any, name?: any): any {
    const arr: Array<any> = [];
    const items = game;

    items.forEach((element: object) => {
      arr.push(this.newFormItem(element, game));
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
      count: item.newsCount ? item.newsCount : null,
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
}
