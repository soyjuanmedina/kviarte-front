import { gql } from "apollo-angular";

// Fragmento común de Gallery
export const GALLERY_FIELDS = gql`
  fragment GalleryFields on Gallery {
    id
    name
    description
    address
    city
    email
    phone
    website
    picture
    owner {
      id
      name
      email
      role
    }
    exhibitions {
      id
      title
    }
    artists {
      id
      name
      style
      picture
    }
    artworks {
      id
      title
      picture
      artist {
        id
        name
      }
    }
    promotions {
      id
      code
      discount
      active
    }
  }
`;

// Obtener todas las galerías
export const GET_GALLERIES = gql`
  query {
    galleries {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

// Obtener una galería concreta
export const GET_GALLERY = gql`
  query GetGallery($id: Int!) {
    gallery(id: $id) {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

// Crear galería
export const CREATE_GALLERY = gql`
  mutation CreateGallery($input: CreateGalleryInput!) {
    createGallery(input: $input) {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

// Actualizar galería
export const UPDATE_GALLERY = gql`
  mutation UpdateGallery($id: Int!, $data: UpdateGalleryInput!) {
    updateGallery(id: $id, data: $data) {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

// Eliminar galería
export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: Int!) {
    deleteGallery(id: $id)
  }
`;
