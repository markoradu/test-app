import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest, LoginResponse } from '../auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.requiredTrue],
    });
  }

  submitForm(value: LoginRequest): void {
    this.auth
      .login(value)
      .subscribe((response: LoginResponse) =>
        localStorage.setItem('token', response.id_token)
      );
    this.auth.getData().subscribe((result) => console.log(result));
  }
}
