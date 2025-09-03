import { gql } from 'apollo-angular';

export const GET_ARTWORKS = gql`
  query GetArtworks {
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
      galeria {
        id_galeria
        nombre
      }
      exposicion {
        id_exposicion
        titulo
      }
    }
  }
`;


export const GET_ARTWORK = gql`
  query GetArtwork($id: Int!) {
    obra(id: $id) {
      id_obra
      titulo
      descripcion
      estilo
      picture
      artist {
        id_artista
        nombre
      }
      galeria {
        id_galeria
        nombre
      }
      exposicion {
        id_exposicion
        titulo
        galeria {
          id_galeria
          nombre
        }
      }
    }
  }
`;



export const CREATE_ARTWORK = gql`
  mutation CreateArtwork($input: CreateObraInput!) {
    createObra(input: $input) {
      id_obra
      titulo
      descripcion
      estilo
      picture
      artist {
        id_artista
        nombre
      }
      galeria {
        id_galeria
        nombre
      }
      exposicion {
        id_exposicion
        titulo
      }
    }
  }
`;


export const UPDATE_ARTWORK = gql`
  mutation UpdateArtwork($id: Int!, $input: UpdateObraInput!) {
    updateObra(id: $id, input: $input) {
      id_obra
      titulo
      descripcion
      estilo
      picture
      artist {
        id_artista
        nombre
      }
      galeria {
        id_galeria
        nombre
      }
      exposicion {
        id_exposicion
        titulo
      }
    }
  }
`;


export const DELETE_ARTWORK = gql`
  mutation DeleteArtwork($id: Int!) {
    deleteObra(id: $id)
  }
`;
