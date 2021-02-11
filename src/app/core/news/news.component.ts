import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/interfaces/news.model';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  page = 0;
  itemsPerPage = 5;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const filters = { page: this.page, size: this.itemsPerPage };
    this.newsService.getNews(filters).subscribe((response) => {
      this.news = response;
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getData();
  }

  handlePageSizeChange(event: any): void {
    this.itemsPerPage = event.target.value;
    this.page = 0;
    this.getData();
  }
}
