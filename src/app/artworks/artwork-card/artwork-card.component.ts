import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Artwork } from '../../core/services/artwork.service';

@Component( {
  selector: 'app-artwork-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss']
} )
export class ArtworkCardComponent {
  @Input() artwork!: Artwork;
  @Input() isAdmin: boolean = false;
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
