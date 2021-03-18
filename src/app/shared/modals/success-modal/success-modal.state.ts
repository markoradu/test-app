import { Injectable, TemplateRef } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class SuccessModalState {

  options: any;


  modal!: NgbModalRef;


  template!: TemplateRef<any>;
}
