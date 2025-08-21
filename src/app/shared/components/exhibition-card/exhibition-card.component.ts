import { Component, Input } from '@angular/core';

export interface Exhibition {
  id: number;
  title: string;
  date: string; // ISO string o formato fecha
  location: string;
  description: string;
  imageUrl: string;
}

@Component( {
  selector: 'app-exhibition-card',
  standalone: true,
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
} )
export class ExhibitionCardComponent {
  @Input() exhibition!: Exhibition;
}
