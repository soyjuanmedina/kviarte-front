// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../core/services/user.service';

@Component( {
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
} )
export class UserItemComponent {
  @Input() user!: Usuario;

  @Output() view = new EventEmitter<Usuario>();
  @Output() delete = new EventEmitter<Usuario>();

  onView () {
    this.view.emit( this.user );
  }

  onDelete () {
    this.delete.emit( this.user );
  }
}
