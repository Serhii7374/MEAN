import {Component, effect} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userIsLoggedIn = false;

  constructor(private authService: AuthService) {
    this.checkIsUserAuth();
  }

  checkIsUserAuth(): void {
    effect(() => {
      this.userIsLoggedIn = this.authService.userIsLoggedIn()
    });
  }

  logout() {
    this.authService.logout();
  }
}
