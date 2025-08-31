import { gql } from "apollo-angular";
import { GALLERY_FIELDS } from "./galleries";


export const ARTIST_FIELDS = gql`
  fragment ArtistFields on Artist {
    id_artista
    nombre
    biografia
    estilo
    picture
    galeria {
      ...GalleryFields
    }
  }
  ${GALLERY_FIELDS}
`;

export const DELETE_ARTIST = gql`
mutation DeleteArtist($id: Int!) {
  deleteArtist(id: $id)
}
`;

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

export const CREATE_ARTIST = gql`
  mutation CreateArtist($input: CreateArtistInput!) {
  createArtist(input: $input) {
    ...ArtistFields
  }
}
${ARTIST_FIELDS}
`;
export const UPDATE_ARTIST = gql`
mutation UpdateArtist(
  $id: Float!
  $data: UpdateArtistInput!
  $id_galeria: Float
) {
  updateArtist(id: $id, data: $data, id_galeria: $id_galeria) {
    id_artista
    nombre
    biografia
    estilo
    picture
    galeria {
      id_galeria
      nombre
    }
  }
}
`;
