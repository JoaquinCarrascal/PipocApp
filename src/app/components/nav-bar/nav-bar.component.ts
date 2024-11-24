import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  userName = '';
  userPhoto = '';
  constructor(private authService: AuthService ,private  router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
          'user_photo'
        )}`
      : 'https://placehold.co/50x50';
  }

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/home/approved`
    });
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true' ? true : false;
  }

  logout() {
    localStorage.clear();
    this.userPhoto = 'https://placehold.co/50x50';
    window.location.href = 'http://localhost:4200';
  }

  navigateTo(route: string) {

    this.router.navigate([route]);

  }

}