import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GET_EXHIBITIONS } from '../../graphql/exhibitions';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { Exhibition, ExhibitionService } from '../core/services/exhibition.service';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';
import { ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';

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
    return user?.role === 'ADMIN';
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
          this.exhibitions = result?.data?.exhibitions ?? [];
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
    this.router.navigate( ['manage/exhibitions', exhibition.id, 'edit'] );
  }

  viewExhibitionProfile ( exhibition: Exhibition ) {
    this.router.navigate( ['exhibitions', exhibition.id, 'profile'] );
  }

  addExhibition () {
    this.router.navigate( ['manage/exhibitions/new'] );
  }

  deleteExhibition ( exhibition: Exhibition ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar Exposición',
        message: `¿Seguro que deseas eliminar a ${exhibition.title}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.exhibitionService.deleteExhibition( exhibition.id ).subscribe( {
        next: () => {
          this.exhibitions = this.exhibitions.filter( u => u.id !== exhibition.id );
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
