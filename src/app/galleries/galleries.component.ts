import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCardComponent } from './gallery-card/gallery-card.component';
import { Apollo } from 'apollo-angular';
import { GET_GALLERIES } from '../../graphql/galleries';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { Gallery, GalleryService } from '../core/services/gallery.service';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component( {
  selector: 'app-galleries',
  standalone: true,
  imports: [CommonModule, GalleryCardComponent],
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
} )
export class GalleriesComponent implements OnInit {
  galleries: Gallery[] = [];
  loading = false;
  error: string | null = null;
  user: User | null = null;
  errorMessage: string = '';

  constructor ( private authService: AuthService, private apollo: Apollo, private router: Router,
    private galleryService: GalleryService,
    private dialog: MatDialog
  ) { }

  goToManageGalleries () {
    this.router.navigate( ['/manage/galleries'] );
  }

  viewGalleryProfile ( gallery: Gallery ) {
    this.router.navigate( ['galleries', gallery.id_galeria, 'profile'] );
  }

  fetchGalleries () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_GALLERIES } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          this.galleries = result?.data?.galerias ?? [];
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar galerías';
          this.loading = false;
        }
      } );
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

  editGallery ( gallery: Gallery ) {
    this.router.navigate( ['manage/galleries', gallery.id_galeria, 'edit'] );
  }

  get isAdmin (): boolean {
    return this.authService.getUser()?.rol === 'ADMIN';
  }

  ngOnInit () {
    this.fetchGalleries();
    this.user = this.authService.getUser();
  }
}
