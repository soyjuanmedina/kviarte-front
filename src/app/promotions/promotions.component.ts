import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialog } from '../shared/components/success-dialog/success-dialog.component';
import { PromotionCardComponent } from './promotion-card/promotion-card.component';
import { Promotion, PromotionService } from '../core/services/promotion.service';
import { GET_ARTWORKS } from '../../graphql/artworks';
import { GET_PROMOTIONS } from '../../graphql/promotions';

@Component( {
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, PromotionCardComponent],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
} )
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];
  loading = false;
  error: string | null = null;
  user: User | null = null;
  errorMessage = '';

  constructor ( private authService: AuthService, private apollo: Apollo, private router: Router,
    private promotionService: PromotionService, private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.role === 'ADMIN';
  }

  viewPromotionProfile ( promotion: Promotion ) {
    this.router.navigate( ['promotions', promotion.id, 'profile'] );
  }

  goToManagePromotions () {
    this.router.navigate( ['/manage/promotions'] );
  }

  addPromotion () {
    this.router.navigate( ['manage/promotions/new'] );
  }

  fetchPromotions () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_PROMOTIONS } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          this.promotions = result?.data?.promotions ?? [];
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar ofertas';
          this.loading = false;
        }
      } );
  }


  editPromotion ( promotion: Promotion ) {
    this.router.navigate( ['manage/promotions', promotion.id, 'edit'] );
  }

  deletePromotion ( promotion: Promotion ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar promoción',
        message: `¿Seguro que deseas eliminar a ${promotion.description}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.promotionService.deletePromotion( promotion.id ).subscribe( {
        next: () => {
          this.promotions = this.promotions.filter( u => u.id !== promotion.id );
          this.dialog.open( SuccessDialog, { data: { message: 'Promoción eliminada correctamente' } } );
        },
        error: err => {
          console.error( 'Error eliminando Promoción', err );
          this.errorMessage = 'No se pudo eliminar la promoción ❌';
        }
      } );
    } );
  }

  ngOnInit () {
    this.fetchPromotions();
    this.user = this.authService.getUser();
  }
}
