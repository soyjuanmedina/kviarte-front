import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { GET_ARTISTS } from '../../graphql/artists';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { Artist, ArtistService } from '../core/services/artist.service';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';

@Component( {
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, ArtistCardComponent],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
} )
export class ArtistsComponent implements OnInit {
  artists: Artist[] = [];
  loading = false;
  error: string | null = null;
  user: User | null = null;
  errorMessage = '';

  constructor ( private authService: AuthService, private apollo: Apollo, private router: Router,
    private artistService: ArtistService, private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.role === 'ADMIN';
  }

  viewArtistProfile ( artist: Artist ) {
    this.router.navigate( ['artists', artist.id, 'profile'] );
  }

  goToManageArtists () {
    this.router.navigate( ['/manage/artists'] );
  }

  fetchArtists () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_ARTISTS, fetchPolicy: 'network-only' } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          this.artists = result?.data?.artists ?? [];
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar artistas';
          this.loading = false;
        }
      } );
  }

  editArtist ( artist: Artist ) {
    this.router.navigate( ['manage/artists', artist.id, 'edit'] );
  }

  addArtist () {
    this.router.navigate( ['manage/artists/new'] );
  }

  deleteArtist ( artist: Artist ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar artista',
        message: `¿Seguro que deseas eliminar a ${artist.name}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.artistService.deleteArtist( artist.id ).subscribe( {
        next: () => {
          this.artists = this.artists.filter( u => u.id !== artist.id );
          this.dialog.open( SuccessDialog, { data: { message: 'Artista eliminado correctamente' } } );
        },
        error: err => {
          console.error( 'Error eliminando Artista', err );
          this.errorMessage = 'No se pudo eliminar el artista ❌';
        }
      } );
    } );
  }

  ngOnInit () {
    this.fetchArtists();
    this.user = this.authService.getUser();
  }
}
