import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments-item',
  templateUrl: './tournaments-item.component.html',
  styleUrls: ['./tournaments-item.component.scss'],
})
export class TournamentsItemComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
