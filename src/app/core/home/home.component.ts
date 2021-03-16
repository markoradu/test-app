import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TfModalComponent } from 'src/app/shared/modals/tf-modal/tf-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  createUserPostHandler() {
    const modalRef = this.modalService.open(TfModalComponent);
  }
}
