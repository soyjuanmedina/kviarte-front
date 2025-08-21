import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component( {
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
} )
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor ( private authService: AuthService ) { }

  ngOnInit (): void {
    this.authService.currentUser$.subscribe( user => {
      this.user = user;
    } );
  }

}
