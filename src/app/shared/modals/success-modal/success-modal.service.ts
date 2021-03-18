import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from './success-modal.component';
import { SuccessModalState } from './success-modal.state';

@Injectable({
  providedIn: 'root'
})
export class SuccessModalService {

  constructor(private modalService: NgbModal, private state: SuccessModalState) { }

  open(options: any): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(SuccessModalComponent);

    return this.state.modal.result;
  }
}
