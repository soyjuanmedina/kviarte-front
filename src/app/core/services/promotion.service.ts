import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GET_PROMOTIONS,
  GET_PROMOTION,
  CREATE_PROMOTION,
  UPDATE_PROMOTION,
  DELETE_PROMOTION
} from '../../../graphql/promotions';
import { Gallery } from './gallery.service';
import { Artwork } from './artwork.service';

export interface Promotion {
  id: number;
  discount: number;
  description?: string | null;
  active: boolean;
  gallery: Gallery;
  artworks?: Artwork[] | null;
  code?: string | null;
  startDate?: string | null; // lo recibes como ISO string desde GraphQL
  endDate?: string | null;
}

@Injectable( {
  providedIn: 'root'
} )
export class PromotionService {

  constructor ( private apollo: Apollo ) { }

  getPromotions (): Observable<Promotion[]> {
    return this.apollo
      .watchQuery<{ promotions: Promotion[] }>( {
        query: GET_PROMOTIONS,
        fetchPolicy: 'network-only',
      } )
      .valueChanges.pipe( map( result => result.data.promotions ) );
  }

  getPromotion ( id: number ): Observable<Promotion> {
    return this.apollo
      .watchQuery<{ promotion: Promotion }>( {
        query: GET_PROMOTION,
        variables: { id },
      } )
      .valueChanges.pipe( map( result => result.data.promotion ) );
  }

  createPromotion ( input: Partial<Promotion> ): Observable<Promotion> {
    return this.apollo.mutate<{ promotion: Promotion }>( {
      mutation: CREATE_PROMOTION,
      variables: { input },
      refetchQueries: [{ query: GET_PROMOTIONS }]
    } ).pipe(
      map( result => {
        const promotion = result.data?.promotion;
        if ( !promotion ) throw new Error( 'No se pudo crear la promoción' );
        return promotion;
      } )
    );
  }

  updatePromotion ( id: number, input: Partial<Promotion> ): Observable<Promotion> {
    return this.apollo.mutate<{ updatePromotion: Promotion }>( {
      mutation: UPDATE_PROMOTION,
      variables: { id, input },
      refetchQueries: [{ query: GET_PROMOTIONS }]
    } ).pipe(
      map( result => {
        const promotion = result.data?.updatePromotion;
        if ( !promotion ) throw new Error( 'No se pudo actualizar la promoción' );
        return promotion;
      } )
    );
  }

  deletePromotion ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_PROMOTION,
      variables: { id }
    } );
  }
}
