import { gql } from 'apollo-angular';

export const GET_ARTWORKS = gql`
  query GetArtworks {
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
      gallery {
        id
        name
      }
      exhibition {
        id
        title
      }
    }
  }
`;

export const GET_ARTWORK = gql`
  query GetArtwork($id: Int!) {
    artwork(id: $id) {
      id
      title
      description
      style
      picture
      artist {
        id
        name
      }
      gallery {
        id
        name
      }
      exhibition {
        id
        title
        gallery {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_ARTWORK = gql`
  mutation CreateArtwork($input: CreateArtworkInput!) {
    createArtwork(input: $input) {
      id
      title
      description
      style
      picture
      artist {
        id
        name
      }
      gallery {
        id
        name
      }
      exhibition {
        id
        title
      }
    }
  }
`;

export const UPDATE_ARTWORK = gql`
  mutation UpdateArtwork($id: Int!, $input: UpdateArtworkInput!) {
    updateArtwork(id: $id, input: $input) {
      id
      title
      description
      style
      picture
      artist {
        id
        name
      }
      gallery {
        id
        name
      }
      exhibition {
        id
        title
      }
    }
  }
`;

export const DELETE_ARTWORK = gql`
  mutation DeleteArtwork($id: Int!) {
    deleteArtwork(id: $id)
  }
`;
