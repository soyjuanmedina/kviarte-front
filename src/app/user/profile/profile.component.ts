import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component( {
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
} )
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor ( private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  get isAdmin (): boolean {
    return this.user?.rol === 'ADMIN';
  }

  goToManageUser () {
    this.router.navigate( ['/manage/users'] );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  goToRegisterGallery () {
    this.router.navigate( ['/register/gallery'] );
  }

  goToRegisterArtist () {
    this.router.navigate( ['/register/artist'] );
  }

  ngOnInit (): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get( 'id' );

    console.log( 'idParam', idParam );

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
