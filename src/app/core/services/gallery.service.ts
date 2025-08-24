import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { DELETE_GALLERY, GET_GALLERIES, GET_GALLERY } from '../../../graphql/queries';
import { Exhibition } from './exhibition.service';
import { Artist } from './artist.service';

export interface Gallery {
  id_galeria: number;
  nombre: string;
  descripcion?: string;
  ciudad?: string;
  direccion?: string;
  web?: string;
  telefono?: string;
  email?: string;
  exposiciones: Exhibition[];
  artists: Artist[];
}

@Injectable( {
  providedIn: 'root',
} )
export class GalleryService {
  constructor ( private apollo: Apollo ) { }

  getGalleries (): Observable<Gallery[]> {
    return this.apollo
      .watchQuery<{ galerias: Gallery[] }>( {
        query: GET_GALLERIES,
        fetchPolicy: 'network-only'
      } )
      .valueChanges.pipe(
        map( result => result.data.galerias )
      );
  }

  deleteGallery ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_GALLERY,
      variables: { id },
    } );
  }

  getGallery ( id: number ): Observable<Gallery> {
    return this.apollo
      .watchQuery<{ galeria: Gallery }>( {
        query: GET_GALLERY,
        variables: { id },
      } )
      .valueChanges.pipe(
        map( result => result.data.galeria )
      );
  }
}
