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
import { ExhibitionItemComponent } from './exhibition-item/exhibition-item.component';
import { Exhibition } from '../exhibition-card/exhibition-card.component';
import { ExhibitionService } from '../../core/services/exhibition.service';

@Component( {
  selector: 'app-manage-exhibition',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ExhibitionItemComponent
  ],
  templateUrl: './manage-exhibitions.component.html',
  styleUrls: ['./manage-exhibitions.component.scss']
} )
export class ManageExhibitionsComponent {
  exhibitions: Exhibition[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private exhibitionService: ExhibitionService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.rol === 'ADMIN';
  }

  filteredExhibitions () {
    if ( !this.filterText.trim() ) return this.exhibitions;
    return this.exhibitions.filter( u =>
      u.titulo.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }

  addExhibition () {
    this.router.navigate( ['manage/exhibitions/new'] );
  }

  editExhibition ( exhibition: Exhibition ) {
    this.router.navigate( ['manage/exhibitions', exhibition.id_exposicion, 'edit'] );
  }

  viewExhibitionProfile ( exhibition: Exhibition ) {
    this.router.navigate( ['exhibitions', exhibition.id_exposicion, 'profile'] );
  }

  deleteExhibition ( exhibition: Exhibition ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar Exposición',
        message: `¿Seguro que deseas eliminar a ${exhibition.titulo}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.exhibitionService.deleteExhibition( exhibition.id_exposicion ).subscribe( {
        next: () => {
          this.exhibitions = this.exhibitions.filter( u => u.id_exposicion !== exhibition.id_exposicion );
          this.dialog.open( SuccessDialog, { data: { message: 'Exposición eliminada correctamente ✅' } } );
        },
        error: err => {
          console.error( 'Error eliminando exposición', err );
          this.errorMessage = 'No se pudo eliminar la exposición ❌';
        }
      } );
    } );
  }


  ngOnInit () {
    if ( this.isAdmin ) {
      this.exhibitionService.getExhibitions().subscribe( {
        next: exhibitions => ( this.exhibitions = exhibitions ),
        error: err => {
          console.error( 'Error cargando exposiciones', err );
          this.errorMessage = 'No se pudieron cargar las exposiciones ❌';
        }
      } );
    }
  }
}
