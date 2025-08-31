// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Exhibition } from '../../exhibition-card/exhibition-card.component';

@Component( {
  selector: 'app-exhibition-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './exhibition-item.component.html',
  styleUrls: ['./exhibition-item.component.scss']
} )
export class ExhibitionItemComponent {
  @Input() exhibition!: Exhibition;

  @Output() view = new EventEmitter<Exhibition>();
  @Output() edit = new EventEmitter<Exhibition>();
  @Output() delete = new EventEmitter<Exhibition>();

  onView () {
    this.view.emit( this.exhibition );
  }

  onEdit () {
    this.edit.emit( this.exhibition );
  }

  onDelete () {
    this.delete.emit( this.exhibition );
  }
}
