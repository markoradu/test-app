import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tf-posts',
  templateUrl: './tf-posts.component.html',
  styleUrls: ['./tf-posts.component.scss'],
})
export class TfPostsComponent implements OnInit {
  @Input() posts!: Array<any>;
  @Input() totalPostsCount!: number;
  @Input() postsPerPage!: number;
  currentPage: number = 1;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Input() isLoading = true;

  constructor() {}

  ngOnInit(): void {}

  trackById(item: any) {
    return item.id;
  }

  changePageHandler(page: number) {
    this.currentPage = page;
    this.changePage.emit(page);
  }
}
