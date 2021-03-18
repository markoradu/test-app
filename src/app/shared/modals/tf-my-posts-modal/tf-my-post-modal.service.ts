import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TfMyPostsModalState } from './tf-my-post-modal.state';
import { TfMyPostsModalComponent } from './tf-my-posts-modal.component';

@Injectable({
  providedIn: 'root',
})
export class TfMyPostModalService {
  constructor(
    private modalService: NgbModal,
    private state: TfMyPostsModalState
  ) {}

  open(options: any): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(TfMyPostsModalComponent);

    return this.state.modal.result;
  }
}
