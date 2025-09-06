import { gql } from 'apollo-angular';

// Obtener todas las exposiciones
export const GET_EXHIBITIONS = gql`
  query GetExhibitions {
    exhibitions {
      id
      title
      description
      picture
      gallery {
        id
        name
        city
      }
      artist {
        id
        name
      }
      artworks {
        id
        title
        description
        style
        picture
        artist {
          id
          name
        }
      }
    }
  }
`;

// Obtener una exposición concreta
export const GET_EXHIBITION = gql`
  query GetExhibition($id: Int!) {
    exhibition(id: $id) {
      id
      title
      description
      picture
      gallery {
        id
        name
        city
      }
      artist {
        id
        name
      }
      artworks {
        id
        title
        description
        style
        picture
        artist {
          id
          name
        }
      }
    }
  }
`;

// Crear exposición
export const CREATE_EXHIBITION = gql`
  mutation CreateExhibition($data: CreateExhibitionInput!) {
    createExhibition(data: $data) {
      id
      title
      description
      picture
      gallery {
        id
        name
      }
      artist {
        id
        name
      }
    }
  }
`;

// Actualizar exposición
export const UPDATE_EXHIBITION = gql`
  mutation UpdateExhibition($id: Int!, $data: UpdateExhibitionInput!) {
    updateExhibition(id: $id, data: $data) {
      id
      title
      description
      picture
      gallery {
        id
        name
      }
      artist {
        id
        name
      }
    }
  }
`;

// Eliminar exposición
export const DELETE_EXHIBITION = gql`
  mutation DeleteExhibition($id: Int!) {
    deleteExhibition(id: $id)
  }
`;
