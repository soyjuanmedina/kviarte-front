import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_GALLERIES } from '../../../graphql/queries';

export interface Gallery {
  id_galeria: number;
  nombre: string;
  ciudad?: string;
  email_contacto?: string;
}

@Injectable( {
  providedIn: 'root',
} )
export class GalleryService {
  constructor ( private apollo: Apollo ) { }

  getGalleries (): Observable<Gallery[]> {
    return this.apollo
      .watchQuery<{ galerias: Gallery[] }>( {
        query: GET_GALLERIES
      } )
      .valueChanges.pipe(
        map( result => result.data.galerias )
      );
  }
}
