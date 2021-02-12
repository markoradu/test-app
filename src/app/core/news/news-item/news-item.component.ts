import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/app/shared/interfaces/news.model';


@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() data!: News;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  click() {
    this.onClick.emit(this.data);
  }
}
