import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tournaments-item',
  templateUrl: './tournaments-item.component.html',
  styleUrls: ['./tournaments-item.component.scss'],
})
export class TournamentsItemComponent implements OnInit {
  @Input() data: any;
  faStar = faStar;
  constructor() {}

  ngOnInit(): void {}
}
