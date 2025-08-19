import { Component, OnInit } from '@angular/core';
import { GalleryService, Gallery } from '../../core/services/gallery.service';

@Component( {
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
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
