import { gql } from 'apollo-angular';

export const USER_BY_ROLE_QUERY = gql`
  query GetUsuariosPorRol($rol: String!) {
    usuariosPorRol(rol: $rol) {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const GET_GALLERIES = gql`
  query {
    galerias {
      id_galeria
      nombre
      ciudad
      email_contacto
    }
  }
`;

export const GET_ARTISTS = gql`
  query {
    artistas {
      id_artista
      nombre
      biografia
      estilo
      galeria {
        id_galeria
        nombre
      }
    }
  }
`;