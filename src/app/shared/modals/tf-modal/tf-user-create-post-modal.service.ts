import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TfModalComponent } from './tf-modal.component';
import { TfUserCreatePostModalState } from './tf-user-create-post-modal.state';

@Injectable({
  providedIn: 'root',
})
export class TfUserCreatePostModalService {
  constructor(
    private modalService: NgbModal,
    private state: TfUserCreatePostModalState
  ) {}

  open(options: any): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(TfModalComponent);

    return this.state.modal.result;
  }

  close(): void {
    this.state.modal.close();
  }

  getModalState(): any {
    return this.state;
  }
}
