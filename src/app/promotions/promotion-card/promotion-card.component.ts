import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Promotion } from '../../core/services/promotion.service';

@Component( {
  selector: 'app-promotion-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss']
} )
export class PromotionCardComponent {
  @Input() promotion!: Promotion;
  @Input() isAdmin: boolean = false;
  @Output() view = new EventEmitter<Promotion>();
  @Output() edit = new EventEmitter<Promotion>();
  @Output() delete = new EventEmitter<Promotion>();

  onView () {
    this.view.emit( this.promotion );
  }

  onEdit () {
    this.edit.emit( this.promotion );
  }

  onDelete () {
    this.delete.emit( this.promotion );
  }
}
