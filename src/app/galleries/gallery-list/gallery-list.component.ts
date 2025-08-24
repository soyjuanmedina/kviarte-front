import { Component, OnInit } from '@angular/core';
import { GalleryService, Gallery } from '../../core/services/gallery.service';

@Component( {
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
} )
export class GalleryListComponent implements OnInit {
  galleries: Gallery[] = [];

  constructor ( private galleryService: GalleryService ) { }

  ngOnInit (): void {
    this.galleryService.getGalleries().subscribe( data => {
      this.galleries = data;
    } );
  }
}
