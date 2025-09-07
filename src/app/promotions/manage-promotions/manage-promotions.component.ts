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
import { PromotionItemComponent } from './promotion-item/promotion-item.component';
import { Promotion, PromotionService } from '../../core/services/promotion.service';

@Component( {
  selector: 'app-manage-promotion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PromotionItemComponent
  ],
  templateUrl: './manage-promotions.component.html',
  styleUrls: ['./manage-promotions.component.scss']
} )
export class ManagePromotionsComponent {
  promotions: Promotion[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private promotionService: PromotionService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.role === 'ADMIN';
  }

  filteredPromotions () {
    if ( !this.filterText.trim() ) return this.promotions;
    return this.promotions.filter( u =>
      u.gallery.name.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }

  addPromotion () {
    this.router.navigate( ['manage/promotions/new'] );
  }

  editPromotion ( promotion: Promotion ) {
    this.router.navigate( ['manage/promotions', promotion.id, 'edit'] );
  }

  viewPromotionProfile ( promotion: Promotion ) {
    this.router.navigate( ['promotions', promotion.id, 'profile'] );
  }

  deletePromotion ( promotion: Promotion ) {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      data: {
        title: 'Eliminar Promoción',
        message: `¿Seguro que deseas eliminar la promoción de la galeria ${promotion.gallery.name}?`
      }
    } );

    dialogRef.afterClosed().subscribe( confirmed => {
      if ( !confirmed ) return;

      this.promotionService.deletePromotion( promotion.id ).subscribe( {
        next: () => {
          this.promotions = this.promotions.filter( u => u.id !== promotion.id );
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
      this.promotionService.getPromotions().subscribe( {
        next: promotions => ( this.promotions = promotions ),
        error: err => {
          console.error( 'Error cargando promociones', err );
          this.errorMessage = 'No se pudieron cargar las promociones ❌';
        }
      } );
    }
  }
}
