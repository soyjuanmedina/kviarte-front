import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ArtistItemComponent } from './artist-item/artist-item.component';
import { Artist, ArtistService } from '../../core/services/artist.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component( {
  selector: 'app-manage-artist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ArtistItemComponent
  ],
  templateUrl: './manage-artists.component.html',
  styleUrls: ['./manage-artists.component.scss']
} )
export class ManageArtistsComponent {
  artists: Artist[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private artistService: ArtistService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.role === 'ADMIN';
  }

  filteredArtists () {
    if ( !this.filterText.trim() ) return this.artists;
    return this.artists.filter( u =>
      u.name.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }
  addArtist () {
    this.router.navigate( ['manage/artists/new'] );
  }

  editArtist ( artist: Artist ) {
    this.router.navigate( ['manage/artists', artist.id, 'edit'] );
  }

  viewArtistProfile ( artist: Artist ) {
    console.log( 'artist.id_artist', artist.id, typeof artist.id );
    this.router.navigate( ['artists', artist.id, 'profile'] );
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
    if ( this.isAdmin ) {
      this.artistService.getArtists().subscribe( {
        next: artistas => ( this.artists = artistas ),
        error: err => {
          console.error( 'Error cargando artistas', err );
          this.errorMessage = 'No se pudieron cargar los artistas ❌';
        }
      } );
    }
  }
}
