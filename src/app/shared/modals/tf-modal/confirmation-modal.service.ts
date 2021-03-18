import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalState } from './confirmation-modal.state';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(
    private modalService: NgbModal,
    private state: ConfirmationModalState
  ) {}

  open(options: any): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(this.state.template, {
      windowClass: 'twog-modal',
      backdropClass: 'light-blue-backdrop',
      centered: true,
    });

    return this.state.modal.result;
  }
}
