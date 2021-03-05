import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from '../../interfaces/news.model';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss'],
})
export class NewsModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  @Input() news!: any;

  ngOnInit(): void {}
}
