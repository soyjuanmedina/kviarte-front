import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component( {
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
} )
export class ProfileUserComponent implements OnInit {
  user$: Observable<User | null> = of( null ); // observable para el template

  constructor (
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  get isAdmin$ (): Observable<boolean> {
    return this.user$.pipe(
      switchMap( user => of( user?.role === 'ADMIN' ) )
    );
  }

  ngOnInit (): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get( 'id' );

    const currentUser = this.authService.getUser();

    if ( idParam ) {
      const id = +idParam;
      if ( currentUser?.role !== 'ADMIN' ) {
        this.router.navigate( ['/profile'] );
        return;
      }
      this.user$ = this.userService.getUserById( id );
    } else {
      this.user$ = of( currentUser );
    }
  }


  goToManageUsers () {
    this.router.navigate( ['/manage/users'] );
  }

  goToManageGalleries () {
    this.router.navigate( ['/manage/galleries'] );
  }

  goToManageArtists () {
    this.router.navigate( ['/manage/artists'] );
  }

  goToManageExhibitions () {
    this.router.navigate( ['/manage/exhibitions'] );
  }

  goToManageArtworks () {
    this.router.navigate( ['/manage/artworks'] );
  }

  goToManagePromotions () {
    this.router.navigate( ['/manage/promotions'] );
  }
}
