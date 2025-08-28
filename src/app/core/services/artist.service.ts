import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { DELETE_ARTIST, GET_ARTIST, GET_ARTISTS } from '../../../graphql/queries';
import { Gallery } from './gallery.service';

export interface Artist {
  id_artista: number;
  nombre: string;
  biografia: string;
  estilo: string;
  id_galeria: number;
  picture?: string;
  galeria?: Gallery;
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
