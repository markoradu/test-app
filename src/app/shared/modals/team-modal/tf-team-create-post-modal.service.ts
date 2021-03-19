import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamModalComponent } from './team-modal.component';
import { TfTeamCreatePostModalState } from './tf-team-create-post-modal-state';

@Injectable({
  providedIn: 'root',
})
export class TfTeamCreatePostModalService {
  constructor(
    private modalService: NgbModal,
    private state: TfTeamCreatePostModalState
  ) {}

  open(options: any): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(TeamModalComponent);

    return this.state.modal.result;
  }

  close(): void {
    this.state.modal.close();
  }

  getModalState(): any {
    return this.state;
  }
}
