import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  ILoginRequest,
  ILoginResponse,
} from '../auth/auth.service';
import { debounceTime } from 'rxjs/operators';
import * as AUTH from '../auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { IAccount } from 'src/app/shared/interfaces/account.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  public account = {
    password: null,
  };
  public barLabel: string = 'Password strength:';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

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
      rememberMe: [false],
    });

    this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.errorMessage = '';
    });
  }

  submitForm(value: ILoginRequest): void {
    this.errorMessage = '';
    if (value && value.rememberMe) {
      this.authService.login(value).subscribe(
        (response: ILoginResponse) => {
          localStorage.setItem('token', response.id_token);
          this.authService.getData().subscribe((userData: IAccount) => {
            this.store.dispatch(new AUTH.Authenticate(userData));
          });
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error.detail;
        }
      );
    }
    if (value && !value.rememberMe) {
      this.authService.login(value).subscribe(
        (response: ILoginResponse) => {
          sessionStorage.setItem('token', response.id_token);
          this.authService.getData().subscribe((userData: IAccount) => {
            this.store.dispatch(new AUTH.Authenticate(userData));
          });
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error.detail;
        }
      );
    }
  }
}
