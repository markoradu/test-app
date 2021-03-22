import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content-cretor',
  templateUrl: './content-cretor.component.html',
  styleUrls: ['./content-cretor.component.scss'],
})
export class ContentCretorComponent implements OnInit {
  creatorForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.creatorForm = this.fb.group({
      firstName: [],
      lastName: [],
      phoneNumber: [],
      day: [],
      month: [],
      year: [],
      language: [],
      streamPlatform: [],
      streamName: [],
      message: [],
    })
  }
}
