import { gql } from 'apollo-angular';
import { ARTIST_FIELDS, GALLERY_FIELDS } from './fragments';

// Users
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

// Galleries
export const GET_GALLERIES = gql`
  query {
    galerias {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

export const GET_GALLERY = gql`
  query GetGallery($id: Int!) {
    galeria(id: $id) {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: Int!) {
    deleteGallery(id: $id)
  }
`;

// Artists
export const GET_ARTISTS = gql`
  query {
    artistas {
      ...ArtistFields
    }
  }
  ${ARTIST_FIELDS}
`;

export const GET_ARTIST = gql`
  query getArtist($id: Float!) {
    artista(id: $id) {
      ...ArtistFields
    }
  }
  ${ARTIST_FIELDS}
`;


export const DELETE_ARTIST = gql`
mutation DeleteArtist($id: Int!) {
  deleteArtist(id: $id)
}
`;

// Exposiciones
export const GET_EXHIBITIONS = gql`
  query {
    exposiciones {
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
      }
      artista {
        id_artista
        nombre
      }
      obras {
        id_obra
        titulo
      }
    }
  }
`;

export const GET_EXHIBITION = gql`
  query getExhibition($id: Float!) {
    exposicion(id: $id) 
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
      }
      artista {
        id_artista
        nombre
      }
      obras {
        id_obra
        titulo
      }
  }
`;

export const DELETE_EXHIBITION = gql`
mutation DeleteExhibition($id: Int!) {
  deleteExhibition(id: $id)
}
`;

