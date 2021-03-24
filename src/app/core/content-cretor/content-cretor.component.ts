import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from './game.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-content-cretor',
  templateUrl: './content-cretor.component.html',
  styleUrls: ['./content-cretor.component.scss'],
})
export class ContentCretorComponent implements OnInit {
  creatorForm!: FormGroup;
  languages$!: Observable<any>;
  games$!: Observable<any>;
  days: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getData();
    this.generateYears();
  }

  getData(): void {
    this.languages$ = this.languageService.getlanguages({ size: 10000 });
    this.games$ = this.gameService.getGames({ size: 10000 });
  }

  createForm(): void {
    this.creatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      day: ['01', Validators.required],
      month: ['January', Validators.required],
      year: ['2021', Validators.required],
      language: ['', Validators.required],
      streamPlatform: ['youtube', Validators.required],
      streamName: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm(): void {}

  onChange(): void {
    this.creatorForm.controls['streamName'].reset();
  }

  generateYears(): void {
    const currentYear = (new Date()).getFullYear();
    const range = (start: any, stop: any, step:any) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    this.years = [...range(currentYear, currentYear - 100, -1)];
  }
}
