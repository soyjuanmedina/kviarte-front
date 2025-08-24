// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Gallery } from '../../../core/services/gallery.service';

@Component( {
  selector: 'app-gallery-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
} )
export class GalleryItemComponent {
  @Input() gallery!: Gallery;

  @Output() view = new EventEmitter<Gallery>();
  @Output() edit = new EventEmitter<Gallery>();
  @Output() delete = new EventEmitter<Gallery>();

  onView () {
    this.view.emit( this.gallery );
  }

  onEdit () {
    this.edit.emit( this.gallery );
  }

  onDelete () {
    this.delete.emit( this.gallery );
  }
}
