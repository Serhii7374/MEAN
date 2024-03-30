import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthData} from "../interfaces";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";

const BACKEND_URL = environment.apiUrl + 'users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  userIsLoggedIn = signal(false);

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  createUser(authData: AuthData): void {
    this.http.post(BACKEND_URL + 'singup', authData)
      .subscribe(res => {
        console.log(res)
      });
  }

  login(authData: AuthData): void {
    this.http.post<{ token: string, userId: string, expiresIn: string }>(BACKEND_URL + 'login', authData)
      .subscribe({
        next: (res) => {
          this.router.navigate(['']);
          this.token = res.token;
          localStorage.setItem('userId', res.userId)
          this.userIsLoggedIn.set(true);
        },
        error: (err) => {
          console.error(err)
        }
      });
  }

  logout() {
    this.userIsLoggedIn.set(false);
  }
}
