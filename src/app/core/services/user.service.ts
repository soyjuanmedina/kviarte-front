import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { USER_BY_ROLE_QUERY } from '../../../graphql/queries';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable( {
  providedIn: 'root',
} )
export class UsersService {
  constructor ( private apollo: Apollo ) { }

  getUsuariosPorRol ( rol: string ): Observable<Usuario[]> {
    return this.apollo
      .watchQuery<{ usuariosPorRol: Usuario[] }>( {
        query: USER_BY_ROLE_QUERY,
        variables: { rol },
      } )
      .valueChanges.pipe( map( result => result.data.usuariosPorRol ) );
  }
}
