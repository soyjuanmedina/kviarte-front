// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Promotion } from '../../../core/services/promotion.service';

@Component( {
  selector: 'app-promotion-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.scss']
} )
export class PromotionItemComponent {
  @Input() promotion!: Promotion;

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
