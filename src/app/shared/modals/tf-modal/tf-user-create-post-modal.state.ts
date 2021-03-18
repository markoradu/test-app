import { Injectable, TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TfUserCreatePostModalState {
  options: any;

  modal!: NgbModalRef;

  template!: TemplateRef<any>;
}
