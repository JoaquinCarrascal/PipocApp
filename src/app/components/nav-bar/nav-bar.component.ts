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
  lang = localStorage.getItem('lang') ?? 'es-ES';
  constructor(private authService: AuthService ,private  router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.loadUserPhoto();
  }

  loadUserPhoto() {
    this.userPhoto = 
    localStorage.getItem('user_photo') != null && localStorage.getItem('user_photo') != 'null' && localStorage.getItem('user_photo') != 'undefined' && localStorage.getItem('user_photo') != ''
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
          'user_photo'
        )}`
      : 'https://placehold.co/50x50/green/white?text=PipocApp';
  }

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/home/approved`
    });
  }

  swapLang(lang: string) {
    
    localStorage.setItem('lang', lang);
    window.location.reload();

  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true' ? true : false;
  }

  logout() {
    let language = localStorage.getItem('lang');
    localStorage.clear();
    if(language)
      localStorage.setItem('lang', language);
    
    this.userPhoto = 'https://placehold.co/50x50';
    window.location.href = 'http://localhost:4200';
  }

  navigateTo(route: string) {

    this.router.navigate([route]);

  }

}
