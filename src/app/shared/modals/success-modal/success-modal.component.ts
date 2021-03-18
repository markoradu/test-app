import { Component, OnInit } from '@angular/core';
import { SuccessModalState } from './success-modal.state';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {
  options: any;

  constructor(private state: SuccessModalState) {
    this.options = this.state.options;
  }

  closeModal() {
    this.state.modal.close();
  }

  ngOnInit(): void {}
}
