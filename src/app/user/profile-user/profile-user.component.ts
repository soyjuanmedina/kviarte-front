import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component( {
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
} )
export class ProfileUserComponent implements OnInit {
  user: User | null = null;

  constructor ( private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  get isAdmin (): boolean {
    return this.user?.role === 'ADMIN';
  }

  goToManageUsers () {
    this.router.navigate( ['/manage/users'] );
  }

  goToManageGalleries () {
    this.router.navigate( ['/manage/galleries'] );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  goToManageArtists () {
    this.router.navigate( ['/manage/artists'] );
  }

  ngOnInit (): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get( 'id' );
    if ( idParam ) {
      // perfil de otro usuario
      const id = +idParam;
      this.userService.getUsuarioById( id ).subscribe( user => {
        this.user = user;
      } );
    } else {
      // perfil propio
      this.user = this.authService.getUser();
    }
  }

}
