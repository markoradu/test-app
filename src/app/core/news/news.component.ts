import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsModalComponent } from 'src/app/shared/modals/news-modal/news-modal.component';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  page = 1;
  size = 5;
  news$!: Observable<{ items: any[]; totalAmountOfItems: number }>;

  constructor(
    private newsService: NewsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(game?: any): void {
    const filters = { page: this.page - 1, size: this.size };
    let filter = { ...game, ...filters };
    this.news$ = this.newsService.getNews(filter).pipe(
      map((news) => {
        return {
          items: news.body,
          totalAmountOfItems: news.headers?.get('X-Total-Count'),
        };
      })
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getData();
  }

  handlePageSizeChange(event: any): void {
    this.size = +event.target.value;
    this.page = 0;
    this.getData();
  }

  openModal($event: any) {
    const modalRef = this.modalService.open(NewsModalComponent);
    modalRef.componentInstance.news = $event;
  }

  collectForm(form: any): void {
    this.getData(form);
  }
}
