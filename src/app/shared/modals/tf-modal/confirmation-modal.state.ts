import { Injectable, TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalState {
  options: any;

  modal!: NgbModalRef;

  template!: TemplateRef<any>;
}
