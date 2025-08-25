// src/app/user/manage-users/user-item/user-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Artist } from '../../../core/services/artist.service';

@Component( {
  selector: 'app-artist-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss']
} )
export class ArtistItemComponent {
  @Input() artist!: Artist;

  @Output() view = new EventEmitter<Artist>();
  @Output() edit = new EventEmitter<Artist>();
  @Output() delete = new EventEmitter<Artist>();

  onView () {
    this.view.emit( this.artist );
  }

  onEdit () {
    this.edit.emit( this.artist );
  }

  onDelete () {
    this.delete.emit( this.artist );
  }
}
