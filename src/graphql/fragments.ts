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