import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { News } from 'src/app/shared/interfaces/news.model';


@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() data!: any;
  @Output() onClick = new EventEmitter();
  faAngleDoubleRight = faAngleDoubleRight;

  constructor() {}

  ngOnInit(): void {
  }

  click() {
    this.onClick.emit(this.data);
  }
}
