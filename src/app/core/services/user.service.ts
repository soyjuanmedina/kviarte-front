import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_USER, GET_USERS, GET_USERS_BY_ROLE, DELETE_USER } from '../../../graphql/users';
import { User } from './auth.service';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable( {
  providedIn: 'root',
} )
export class UserService {
  constructor ( private apollo: Apollo ) { }

  getUsuariosPorRol ( rol: string ): Observable<Usuario[]> {
    return this.apollo
      .watchQuery<{ usuariosPorRol: Usuario[] }>( {
        query: GET_USERS_BY_ROLE,
        variables: { rol },
      } )
      .valueChanges.pipe( map( result => result.data.usuariosPorRol ) );
  }

  getUsuarios (): Observable<Usuario[]> {
    return this.apollo
      .watchQuery<{ usuarios: Usuario[] }>( {
        query: GET_USERS,
        fetchPolicy: 'network-only'
      } )
      .valueChanges.pipe( map( result => result.data.usuarios ) );
  }

  getUsuarioById ( id: number ): Observable<User> {
    return this.apollo
      .watchQuery<{ usuario: User }>( {
        query: GET_USER,
        variables: { id }
      } )
      .valueChanges.pipe( map( result => result.data.usuario ) );
  }

  deleteUser ( id: number ): Observable<any> {
    return this.apollo.mutate( {
      mutation: DELETE_USER,
      variables: { id },
    } );
  }
}
