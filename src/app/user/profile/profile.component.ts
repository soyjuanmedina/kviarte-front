import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component( {
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
