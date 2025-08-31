import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Gallery } from '../../core/services/gallery.service';
import { Artist } from '../../core/services/artist.service';
import { Artwork } from '../../core/services/artwork.service';

export interface Exhibition {
  id_exposicion: number;
  titulo: string;
  descripcion?: string;   // puede venir vacío
  picture?: string;       // base64 o null
  galeria?: Gallery;
  artist?: Artist;
  obras: Artwork[];
}

@Component( {
  selector: 'app-exhibition-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
} )
export class ExhibitionCardComponent {
  @Input() exhibition!: Exhibition;
  @Input() isAdmin: boolean = false;
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
