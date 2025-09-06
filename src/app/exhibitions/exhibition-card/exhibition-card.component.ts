import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Exhibition } from '../../core/services/exhibition.service';

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
