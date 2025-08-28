import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Exhibition, ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { ArtistService } from '../core/services/artist.service';
import { MatDialog } from '@angular/material/dialog';
import { GET_EXHIBITIONS } from '../../graphql/queries';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { ExhibitionService } from '../core/services/exhibition.service';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';

@Component( {
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  standalone: true,
  imports: [CommonModule, ExhibitionCardComponent],
  styleUrls: ['./exhibitions.component.scss']
} )
export class ExhibitionsComponent {
  exhibitions: Exhibition[] = [];
  loading = false;
  error: string | null = null;
  user: User | null = null;
  errorMessage = '';

  constructor ( private authService: AuthService, private apollo: Apollo, private router: Router,
    private exhibitionService: ExhibitionService, private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'ADMIN';
  }

  goToManageExhibitions () {
    this.router.navigate( ['/manage/exhibitions'] );
  }

  fetchExhibitions () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_EXHIBITIONS } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          this.exhibitions = result?.data?.exposiciones ?? [];
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar Exposiciones';
          this.loading = false;
        }
      } );
  }

  editExhibition ( exhibition: Exhibition ) {
    this.router.navigate( ['/manage/exhibition/edit', exhibition.id_exposicion] );
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
          this.dialog.open( SuccessDialog, { data: { message: 'Exposición eliminada correctamente' } } );
        },
        error: err => {
          console.error( 'Error eliminando Exposición', err );
          this.errorMessage = 'No se pudo eliminar la exposición ❌';
        }
      } );
    } );
  }

  ngOnInit () {
    this.fetchExhibitions();
    this.user = this.authService.getUser();
  }
}
