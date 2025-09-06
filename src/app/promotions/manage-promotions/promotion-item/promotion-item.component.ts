// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Artwork } from '../../../core/services/artwork.service';

@Component( {
  selector: 'app-artwork-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './artwork-item.component.html',
  styleUrls: ['./artwork-item.component.scss']
} )
export class ArtworkItemComponent {
  @Input() artwork!: Artwork;

  @Output() view = new EventEmitter<Artwork>();
  @Output() edit = new EventEmitter<Artwork>();
  @Output() delete = new EventEmitter<Artwork>();

  onView () {
    this.view.emit( this.artwork );
  }

  onEdit () {
    this.edit.emit( this.artwork );
  }

  onDelete () {
    this.delete.emit( this.artwork );
  }
}
