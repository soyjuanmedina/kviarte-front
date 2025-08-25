import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Artist, ArtistService } from '../../core/services/artist.service';
import { GalleryService } from '../../core/services/gallery.service';

@Component( {
  selector: 'app-artist-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
} )
export class ArtistProfileComponent implements OnInit {
  artist?: Artist = {
    id_artista: 0,
    nombre: '',
    biografia: '',
    estilo: '',
    id_galeria: 0,
    galeria: undefined
  };
  loading = true;
  error?: string;

  constructor ( private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private artistService: ArtistService, private galleryService: GalleryService
  ) { }

  goToManageUsers () {
    this.router.navigate( ['/manage/users'] );
  }

  goToManageArtists () {
    this.router.navigate( ['/manage/artists'] );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  goToRegisterArtist () {
    this.router.navigate( ['/register/artist'] );
  }

  ngOnInit (): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get( 'id' );
    if ( !idParam ) {
      this.router.navigate( ['/home'] );
      return;
    }

    const id = +idParam;
    this.loading = true;

    this.artistService.getArtist( id ).subscribe( {
      next: ( artist ) => {
        this.artist = artist;
        this.loading = false;
      },
      error: ( err ) => {
        this.error = 'No se pudo cargar el artista';
        this.loading = false;
      }
    } );
  }

}
