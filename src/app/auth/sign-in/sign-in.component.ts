import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signIn(): void {
    const authData = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };

    this.authService.createUser(authData)
    this.form.reset();
  }
}
