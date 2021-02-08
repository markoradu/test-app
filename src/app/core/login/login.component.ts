import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest, LoginResponse } from '../auth/auth.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['', Validators.required],
      rememberMe: [false, Validators.requiredTrue],
    });

    this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
      this.errorMessage = '';
    });
  }

  submitForm(value: LoginRequest): void {
    this.auth.login(value).subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('token', response.id_token);
        this.errorMessage = '';
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.detail;
      }
    );
    this.auth.getData().subscribe((result) => console.log(result));
  }
}
