import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_GALLERIES, GET_GALLERY, DELETE_GALLERY } from '../../../graphql/galleries';
import { Artist } from './artist.service';
import { Promotion } from './promotion.service';
import { Artwork } from './artwork.service';
import { Exhibition } from './exhibition.service';
import { User } from './auth.service';

export interface Gallery {
  id: number;
  name: string;
  description?: string;
  city?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  picture?: string;
  owner?: User | null; // puede no venir del backend
  exhibitions?: Exhibition[] | null; // opcional y puede ser null
  artists?: Artist[] | null;         // opcional y puede ser null
  promotions?: Promotion[] | null;   // opcional y puede ser null
  artworks?: Artwork[] | null;       // opcional y puede ser null
}

@Injectable( {
  providedIn: 'root',
} )
export class GalleryService {
  constructor ( private apollo: Apollo ) { }

  getGalleries (): Observable<Gallery[]> {
    return this.apollo
      .watchQuery<{ galleries: Gallery[] }>( {
        query: GET_GALLERIES,
        fetchPolicy: 'network-only'
      } )
      .valueChanges.pipe(
        map( result => result.data.galleries )
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
