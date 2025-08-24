import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component( {
  selector: 'app-gallery-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './gallery-profile.component.html',
  styleUrl: './gallery-profile.component.scss'
} )
export class GalleryProfileComponent implements OnInit {
  gallery?: Gallery = {
    id_galeria: 0,
    nombre: '',
    exposiciones: [],
    artists: [],
  };
  loading = true;
  error?: string;

  constructor ( private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private galleryService: GalleryService
  ) { }

  goToManageUsers () {
    this.router.navigate( ['/manage/users'] );
  }

  goToManageGalleries () {
    this.router.navigate( ['/manage/galleries'] );
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
    if ( idParam ) {
      const id = +idParam;
      this.galleryService.getGallery( id ).subscribe( {
        next: ( gallery ) => {
          this.gallery = gallery;
          this.loading = false;
        },
        error: ( err ) => {
          this.error = err.message;
          this.loading = false;
        },
      } );
    } else {
      this.router.navigate( ['/home'] );
    }
  }

}
