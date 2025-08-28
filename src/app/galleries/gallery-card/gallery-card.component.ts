import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gallery } from '../../core/services/gallery.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component( {
  selector: 'app-gallery-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss']
} )
export class GalleryCardComponent {
  @Input() gallery!: Gallery;
  @Input() isAdmin: boolean = false;
  @Output() edit = new EventEmitter<Gallery>();
  @Output() delete = new EventEmitter<Gallery>();

  onEdit () {
    this.edit.emit( this.gallery );
  }

  onDelete () {
    this.delete.emit( this.gallery );
  }
}
