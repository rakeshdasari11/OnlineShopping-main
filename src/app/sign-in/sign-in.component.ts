// sign-in.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiAreaService } from '../services/api-area.service';
import { ToolsService } from '../services/tools.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  @Output() closeEmit = new EventEmitter<boolean>();
  @Output() changeEmit = new EventEmitter<boolean>();
  @Output() loggedEmit = new EventEmitter<boolean>();

  errorSMS: string = '';
  errAlert: boolean = false;
  successLogin: boolean = false;
  isLoading: boolean = false;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiAreaService,
    public _cookie: CookieService,
    private tools: ToolsService
  ) {}

  signIn() {
    if (this.signInForm.invalid) return;

    this.isLoading = true;
    this.api.signIn(this.signInForm.value).subscribe({
      next: (data: any) => {
        this._cookie.set('user', data.access_token, 1);
        this.errAlert = false;
        this.successLogin = true;

        this.api.profileInfo().subscribe((data: any) => {
          const userInfo = {
            firstName: data.firstName,
            avatar: data.avatar,
          };
          this.tools.userNavbarInfo.next(userInfo);
          this._cookie.set('userInfo', JSON.stringify(userInfo), 1);
        });

        setTimeout(() => {
          this.isLoading = false;
          this.closeEmit.emit(false);
          this.loggedEmit.emit(true);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorSMS = err.error.error || 'An error occurred';
        this.errAlert = true;
      },
    });
  }

  closeForm() {
    this.closeEmit.emit(false);
  }

  outSide(event: any) {
    if (event.target.classList.contains('signArea')) {
      this.closeForm();
    }
  }

  change() {
    this.changeEmit.emit(true);
  }

  getFormControl(name: string) {
    return this.signInForm.get(name);
  }
}