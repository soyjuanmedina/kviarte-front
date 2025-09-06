import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import { Artwork, ArtworkService } from '../core/services/artwork.service';
import { GET_ARTWORKS } from '../../graphql/artworks';

@Component( {
  selector: 'app-artworks',
  standalone: true,
  imports: [CommonModule, ArtworkCardComponent],
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
} )
export class ArtworksComponent implements OnInit {
  artworks: Artwork[] = [];
  loading = false;
  error: string | null = null;
  user: User | null = null;
  errorMessage = '';

  constructor ( private authService: AuthService, private apollo: Apollo, private router: Router,
    private artworkService: ArtworkService, private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.role === 'ADMIN';
  }

  viewArtworkProfile ( artwork: Artwork ) {
    this.router.navigate( ['artworks', artwork.id, 'profile'] );
  }

  goToManageArtworks () {
    this.router.navigate( ['/manage/artworks'] );
  }

  addArtwork () {
    this.router.navigate( ['manage/artworks/new'] );
  }

  fetchArtworks () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_ARTWORKS } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          console.log( 'this.artworks', this.artworks );
          this.artworks = result?.data?.artworks ?? [];
          console.log( 'this.artworks2', this.artworks );
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar obras';
          this.loading = false;
        }
      } );
  }


  editArtwork ( artwork: Artwork ) {

    console.log( 'artwork.id', artwork.id );
    this.router.navigate( ['manage/artworks', artwork.id, 'edit'] );
  }

  deleteArtwork ( artwork: Artwork ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar obra',
        message: `¿Seguro que deseas eliminar a ${artwork.title}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.artworkService.deleteArtwork( artwork.id ).subscribe( {
        next: () => {
          this.artworks = this.artworks.filter( u => u.id !== artwork.id );
          this.dialog.open( SuccessDialog, { data: { message: 'Obra eliminada correctamente' } } );
        },
        error: err => {
          console.error( 'Error eliminando Obra', err );
          this.errorMessage = 'No se pudo eliminar la obra ❌';
        }
      } );
    } );
  }

  ngOnInit () {
    this.fetchArtworks();
    this.user = this.authService.getUser();
  }
}
