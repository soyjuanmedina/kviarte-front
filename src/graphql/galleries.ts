import { gql } from "apollo-angular";


export const GALLERY_FIELDS = gql`
  fragment GalleryFields on Galeria {
    id_galeria
    nombre
    descripcion
    direccion
    ciudad
    email
    telefono
    web
    picture
    propietario {        # 👈 Añadido
      id_usuario
      nombre
      email
    }
    exposiciones {
      id_exposicion
      titulo
    }
    artists {
      id_artista
      nombre
    }
  }
`;



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


export const CREATE_GALLERY = gql`
mutation CreateGallery($input: CreateGalleryInput!) {
  createGaleria(input: $input) {
    ...GalleryFields
  }
}
${GALLERY_FIELDS}
`;

export const UPDATE_GALLERY = gql`
  mutation UpdateGaleria($id: Int!, $data: UpdateGalleryInput!) {
    updateGaleria(id: $id, data: $data) {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

