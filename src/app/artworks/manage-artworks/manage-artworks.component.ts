import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalService } from '../../core/services/modal.service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ArtworkItemComponent } from './artwork-item/artwork-item.component';
import { Artwork, ArtworkService } from '../../core/services/artwork.service';

@Component( {
  selector: 'app-manage-artwork',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ArtworkItemComponent
  ],
  templateUrl: './manage-artworks.component.html',
  styleUrls: ['./manage-artworks.component.scss']
} )
export class ManageArtworksComponent {
  artworks: Artwork[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private artworkService: ArtworkService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.rol === 'ADMIN';
  }

  filteredArtworks () {
    if ( !this.filterText.trim() ) return this.artworks;
    return this.artworks.filter( u =>
      u.titulo.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }

  addArtwork () {
    this.router.navigate( ['manage/artworks/new'] );
  }

  editArtwork ( artwork: Artwork ) {
    this.router.navigate( ['manage/artworks', artwork.id_obra, 'edit'] );
  }

  viewArtworkProfile ( artwork: Artwork ) {
    this.router.navigate( ['artworks', artwork.id_obra, 'profile'] );
  }

  deleteArtwork ( artwork: Artwork ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar Obra',
        message: `¿Seguro que deseas eliminar a ${artwork.titulo}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.artworkService.deleteArtwork( artwork.id_obra ).subscribe( {
        next: () => {
          this.artworks = this.artworks.filter( u => u.id_obra !== artwork.id_obra );
          this.dialog.open( SuccessDialog, { data: { message: 'Obra eliminada correctamente ✅' } } );
        },
        error: err => {
          console.error( 'Error eliminando obra', err );
          this.errorMessage = 'No se pudo eliminar la obra ❌';
        }
      } );
    } );
  }


  ngOnInit () {
    if ( this.isAdmin ) {
      this.artworkService.getArtworks().subscribe( {
        next: artworks => ( this.artworks = artworks ),
        error: err => {
          console.error( 'Error cargando obras', err );
          this.errorMessage = 'No se pudieron cargar las obras ❌';
        }
      } );
    }
  }
}
