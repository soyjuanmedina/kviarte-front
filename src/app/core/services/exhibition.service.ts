import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_EXHIBITION, GET_EXHIBITIONS, DELETE_EXHIBITION } from '../../../graphql/exhibitions';
import { Gallery } from './gallery.service';
import { Artist } from './artist.service';
import { Artwork } from './artwork.service';

export interface Exhibition {
  id: number;
  title: string;
  description?: string | null;
  picture?: string | null;
  gallery?: Gallery | null;
  artist?: Artist | null;
  artworks?: Artwork[] | null;
}

@Injectable( {
  providedIn: 'root'
} )
export class ExhibitionService {

  constructor ( private apollo: Apollo ) { }

  getExhibitions (): Observable<Exhibition[]> {
    return this.apollo
      .watchQuery<{ exposiciones: Exhibition[] }>( {
        query: GET_EXHIBITIONS,
        fetchPolicy: 'network-only'
      } )
      .valueChanges.pipe(
        map( result => result.data.exposiciones )
      );
  }

  deleteExhibition ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_EXHIBITION,
      variables: { id },
    } );
  }

  getExhibition ( id: number ): Observable<Exhibition> {
    return this.apollo
      .watchQuery<{ exposicion: Exhibition }>( {
        query: GET_EXHIBITION,
        variables: { id },
      } )
      .valueChanges.pipe(
        map( result => result.data.exposicion )
      );
  }
}
