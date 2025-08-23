import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query GetUsuarios {
    usuarios {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUsuario($id: Int!) {
    usuario(id: $id) {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const GET_USERS_BY_ROLE = gql`
  query GetUsuariosPorRol($rol: String!) {
    usuariosPorRol(rol: $rol) {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUsuario($id: Int!) {
    deleteUsuario(id: $id)
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