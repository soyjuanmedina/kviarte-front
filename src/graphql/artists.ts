import { gql } from "apollo-angular";
import { GALLERY_FIELDS } from "./galleries";

export const ARTIST_FIELDS = gql`
  fragment ArtistFields on Artist {
    id
    name
    biography
    style
    picture
    gallery {
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
    artists {
      ...ArtistFields
    }
  }
  ${ARTIST_FIELDS}
`;

export const GET_ARTIST = gql`
  query GetArtist($id: Int!) {
    artist(id: $id) {
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
  mutation UpdateArtist($id: Int!, $data: UpdateArtistInput!, $gallery_id: Int) {
    updateArtist(id: $id, data: $data, gallery_id: $gallery_id) {
      ...ArtistFields
    }
  }
  ${ARTIST_FIELDS}
`;
