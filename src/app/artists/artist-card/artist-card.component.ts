import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Artist } from '../../core/services/artist.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component( {
  selector: 'app-artist-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
} )
export class ArtistCardComponent {
  @Input() artist!: Artist;
  @Input() isAdmin: boolean = false;
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
