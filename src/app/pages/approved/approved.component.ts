import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.createSession().subscribe((response) => {
      localStorage.setItem('session_id', response.session_id);
      this.accountService.getAccountDetails().subscribe((response) => {
        localStorage.setItem('user_name', response.name);
        localStorage.setItem('user_photo', response.avatar.tmdb.avatar_path);
        localStorage.setItem('logged_in', 'true');

        window.location.href = 'http://localhost:4200/home';
      });
    });
  }

}
