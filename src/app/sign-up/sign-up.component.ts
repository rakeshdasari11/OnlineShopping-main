// sign-up.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiAreaService } from '../services/api-area.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  @Output() closeEmit = new EventEmitter<boolean>();

  successRegister = false;
  errorList: string[] = [];
  isLoading = false;

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    // age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    // address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('+995', [Validators.required, Validators.minLength(9)]),
    // zipcode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // avatar: new FormControl('', Validators.required),
    // gender: new FormControl('', Validators.required),
  });

  constructor(private service: ApiAreaService) {}

  signUp() {
    debugger
    if (this.signUpForm.invalid) return;
    this.isLoading = true;
    let data = {
      ...this.signUpForm.value,
        age: 28,
    address: "55222255",
    zipcode: "8888",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-3fHwHfTzFBOnb3uEH3Tj4klzmxgvLvahGGUts7R-dRPVI68TVElWbCWGmAuZe_ummY&usqp=CAU",
    gender: "MALE"
    }
    this.service.register(data).subscribe({
      next: (data: any) => {
        this.errorList = [];
        this.successRegister = true;
        this.isLoading = false;

        setTimeout(() => {
          this.closeEmit.emit(false);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorList = err.error.errorKeys || ['An error occurred'];
        this.successRegister = false;
      },
    });
  }

  closeForm() {
    this.closeEmit.emit(false);
  }

  everyWhere(event: any) {
    if (event.target.classList.contains('signArea')) {
      this.closeForm();
    }
  }
}