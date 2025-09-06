import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_USER, GET_USERS, GET_USERS_BY_ROLE, DELETE_USER } from '../../../graphql/users';
import { User } from './auth.service';



@Injectable( {
  providedIn: 'root',
} )
export class UserService {
  constructor ( private apollo: Apollo ) { }

  getUsuariosPorRol ( role: string ): Observable<User[]> {
    return this.apollo
      .watchQuery<{ usuariosPorRol: User[] }>( {
        query: GET_USERS_BY_ROLE,
        variables: { role },
      } )
      .valueChanges.pipe( map( result => result.data.usuariosPorRol ) );
  }

  getUsers (): Observable<User[]> {
    return this.apollo
      .watchQuery<{ users: User[] }>( {
        query: GET_USERS,
        fetchPolicy: 'network-only',
      } )
      .valueChanges
      .pipe(
        map( result => result.data.users ) // extrae directamente el array
      );
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
