import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-item-full',
  templateUrl: './tournament-item-full.component.html',
  styleUrls: ['./tournament-item-full.component.scss'],
})
export class TournamentItemFullComponent implements OnInit {
  @Input() datas: any;

  constructor() {}

  ngOnInit(): void {}
}
