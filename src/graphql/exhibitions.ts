import { gql } from 'apollo-angular';

// Obtener todas las exposiciones
export const GET_EXHIBITIONS = gql`
  query GetExhibitions {
    exposiciones {
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
        ciudad
      }
      artist {
        id_artista
        nombre
      }
      obras {
        id_obra
        titulo
        descripcion
        estilo
        picture
        artist {
          id_artista
          nombre
        }
      }
    }
  }
`;

// Obtener una exposición concreta
export const GET_EXHIBITION = gql`
  query GetExhibition($id: Int!) {
    exposicion(id: $id) {
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
        ciudad
      }
      artist {
        id_artista
        nombre
      }
      obras {
        id_obra
        titulo
        descripcion
        estilo
        picture
        artist {
          id_artista
          nombre
        }
      }
    }
  }
`;

// Crear exposición
export const CREATE_EXHIBITION = gql`
  mutation CreateExhibition($data: CreateExposicionInput!) {
    createExposicion(data: $data) {
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
      }
      artist {
        id_artista
        nombre
      }
    }
  }
`;

// Actualizar exposición
export const UPDATE_EXHIBITION = gql`
  mutation UpdateExhibition($id: Int!, $data: CreateExposicionInput!) {
    updateExposicion(id: $id, data: $data) {
      id_exposicion
      titulo
      descripcion
      picture
      galeria {
        id_galeria
        nombre
      }
      artist {
        id_artista
        nombre
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
