import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalService } from '../../core/services/modal.service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component( {
  selector: 'app-manage-gallery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GalleryItemComponent
  ],
  templateUrl: './manage-galleries.component.html',
  styleUrls: ['./manage-galleries.component.scss']
} )
export class ManageGalleriesComponent {
  galleries: Gallery[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private galleryService: GalleryService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.rol === 'ADMIN';
  }

  filteredGalleries () {
    if ( !this.filterText.trim() ) return this.galleries;
    return this.galleries.filter( u =>
      u.nombre.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }
  addGallery () {
    this.router.navigate( ['manage/galleries/new'] );
  }

  editGallery ( gallery: Gallery ) {
    this.router.navigate( ['manage/galleries', gallery.id_galeria, 'edit'] );
  }

  viewGalleryProfile ( gallery: Gallery ) {
    this.router.navigate( ['galleries', gallery.id_galeria, 'profile'] );
  }

  deleteGallery ( gallery: Gallery ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar Galería',
        message: `¿Seguro que deseas eliminar a ${gallery.nombre}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.galleryService.deleteGallery( gallery.id_galeria ).subscribe( {
        next: () => {
          this.galleries = this.galleries.filter( u => u.id_galeria !== gallery.id_galeria );
          this.dialog.open( SuccessDialog, { data: { message: 'Galería eliminada correctamente ✅' } } );
        },
        error: err => {
          console.error( 'Error eliminando galería', err );
          this.errorMessage = 'No se pudo eliminar la galería ❌';
        }
      } );
    } );
  }


  ngOnInit () {
    if ( this.isAdmin ) {
      this.galleryService.getGalleries().subscribe( {
        next: galleries => ( this.galleries = galleries ),
        error: err => {
          console.error( 'Error cargando galerias', err );
          this.errorMessage = 'No se pudieron cargar los galerias ❌';
        }
      } );
    }
  }
}
