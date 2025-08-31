import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GET_ARTWORKS,
  GET_ARTWORK,
  CREATE_ARTWORK,
  UPDATE_ARTWORK,
  DELETE_ARTWORK
} from '../../../graphql/artworks';
import { Artist } from './artist.service';
import { Exhibition } from '../../exhibitions/exhibition-card/exhibition-card.component';

export interface Artwork {
  id_obra: number;
  titulo: string;
  descripcion?: string | null;
  estilo?: string | null;
  picture?: string | null;
  artist?: Artist | null;
  exposicion?: Exhibition | null;
}

@Injectable( {
  providedIn: 'root'
} )
export class ArtworkService {

  constructor ( private apollo: Apollo ) { }

  getArtworks (): Observable<Artwork[]> {
    return this.apollo
      .watchQuery<{ obras: Artwork[] }>( {
        query: GET_ARTWORKS,
        fetchPolicy: 'network-only',
      } )
      .valueChanges.pipe( map( result => result.data.obras ) );
  }

  getArtwork ( id: number ): Observable<Artwork> {
    return this.apollo
      .watchQuery<{ obra: Artwork }>( {
        query: GET_ARTWORK,
        variables: { id },
      } )
      .valueChanges.pipe( map( result => result.data.obra ) );
  }


  createArtwork ( input: Partial<Artwork> ): Observable<Artwork> {
    return this.apollo.mutate<{ createObra: Artwork }>( {
      mutation: CREATE_ARTWORK,
      variables: { input },
      refetchQueries: [{ query: GET_ARTWORKS }]
    } ).pipe(
      map( result => {
        const obra = result.data?.createObra;
        if ( !obra ) throw new Error( 'No se pudo crear la obra' );
        return { ...obra, exhibition: obra.exposicion };
      } )
    );
  }

  updateArtwork ( id: number, input: Partial<Artwork> ): Observable<Artwork> {
    return this.apollo.mutate<{ updateObra: Artwork }>( {
      mutation: UPDATE_ARTWORK,
      variables: { id, input },
      refetchQueries: [{ query: GET_ARTWORKS }]
    } ).pipe(
      map( result => {
        const obra = result.data?.updateObra;
        if ( !obra ) throw new Error( 'No se pudo actualizar la obra' );
        return { ...obra, exhibition: obra.exposicion };
      } )
    );
  }

  deleteArtwork ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_ARTWORK,
      variables: { id }
    } );
  }
}
