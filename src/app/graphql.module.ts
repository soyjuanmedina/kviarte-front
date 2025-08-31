import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, ApolloLink, from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Router } from '@angular/router';

export function createApollo (): ApolloClientOptions<any> {
  const uri = 'https://junior-muriel-kviarte-1f4b5cb5.koyeb.app/graphql';
  // const uri = 'https://kviarte-backend-production.up.railway.app/graphql';
  const httpLink = inject( HttpLink );
  const router = inject( Router );

  // Link para agregar Authorization header
  const authLink = new ApolloLink( ( operation, forward ) => {
    const token = localStorage.getItem( 'token' );
    operation.setContext( {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    } );
    return forward( operation );
  } );

  // Link para manejar errores
  const errorLink = onError( ( { graphQLErrors, networkError } ) => {
    if ( graphQLErrors ) {
      for ( const err of graphQLErrors ) {
        // Aquí detectamos errores de autenticación
        if ( err.message.includes( 'Unauthorized' ) ) {
          console.warn( 'Token inválido o expirado. Cerrando sesión.' );
          localStorage.removeItem( 'token' ); // Limpiamos token
          router.navigate( ['/'] ); // Redirigimos al login o home
        }
      }
    }
    if ( networkError ) {
      console.error( 'Network error', networkError );
    }
  } );

  const link = from( [errorLink, authLink, httpLink.create( { uri } )] );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule( {
  providers: [provideApollo( createApollo )],
} )
export class GraphQLModule { }
