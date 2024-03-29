import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(): void {
    const authData = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };

    this.authService.login(authData)
    this.form.reset();
  }
}
