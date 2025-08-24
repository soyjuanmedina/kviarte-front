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
      email
    }
  }
`;

export const GET_GALLERY = gql`
  query GetGallery($id: Int!) {
    galeria(id: $id) {
      id_galeria
      nombre
      descripcion
      direccion
      ciudad
      email
      telefono
      web
      exposiciones {
        id_exposicion
        titulo
      }
      artists {
        id_artista
        nombre
      }
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

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: Int!) {
    deleteGallery(id: $id)
  }
`;