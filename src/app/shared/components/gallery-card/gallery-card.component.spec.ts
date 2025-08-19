import { Component, Input } from '@angular/core';
import { Gallery } from '../../../core/services/gallery.service';

@Component( {
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss']
} )
export class GalleryCardComponent {
  @Input() gallery!: Gallery;
}
