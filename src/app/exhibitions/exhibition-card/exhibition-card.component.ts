import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Exhibition {
  id_exposicion: number;
  titulo: string;
  date: string; // ISO string o formato fecha
  location: string;
  description: string;
  picture: string;
}

@Component( {
  selector: 'app-exhibition-card',
  standalone: true,
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
} )
export class ExhibitionCardComponent {
  @Input() exhibition!: Exhibition;
  @Input() isAdmin: boolean = false;
  @Output() edit = new EventEmitter<Exhibition>();
  @Output() delete = new EventEmitter<Exhibition>();

  onEdit () {
    this.edit.emit( this.exhibition );
  }

  onDelete () {
    this.delete.emit( this.exhibition );
  }
}
