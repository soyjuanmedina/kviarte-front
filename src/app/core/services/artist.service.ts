import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Gallery } from './gallery.service';
import { DELETE_ARTIST, GET_ARTIST, GET_ARTISTS } from '../../../graphql/artists';

export interface Artist {
  id: number;
  name: string;
  biography?: string; // opcional, puede ser null
  style?: string;     // opcional
  picture?: string;   // opcional
  gallery_id?: number; // opcional, puede ser null si no tiene galería
  gallery?: Gallery | null; // opcional y puede ser null
}

@Injectable( {
  providedIn: 'root'
} )
export class ArtistService {

  constructor ( private apollo: Apollo ) { }

  getArtists (): Observable<Artist[]> {
    return this.apollo
      .watchQuery<{ artistas: Artist[] }>( {
        query: GET_ARTISTS,
        fetchPolicy: 'network-only'
      } )
      .valueChanges.pipe(
        map( result => result.data.artistas )
      );
  }

  deleteArtist ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_ARTIST,
      variables: { id },
    } );
  }

  getArtist ( id: number ): Observable<Artist> {
    return this.apollo
      .watchQuery<{ artista: Artist }>( {
        query: GET_ARTIST,
        variables: { id },
      } )
      .valueChanges.pipe(
        map( result => result.data.artista )
      );
  }
}
