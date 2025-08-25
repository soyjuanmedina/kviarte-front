import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id_usuario
      nombre
      email
      rol
    }
  }
}
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGaleria(
    $usuario_id: Float!
    $nombre: String!
    $descripcion: String
    $direccion: String
    $ciudad: String
    $web: String
    $telefono: String
    $email: String
  ) {
    createGaleria(
      usuario_id: $usuario_id
      nombre: $nombre
      descripcion: $descripcion
      direccion: $direccion
      ciudad: $ciudad
      web: $web
      telefono: $telefono
      email: $email
    ) {
      id_galeria
      nombre
      usuario_id
      email
      telefono
      ciudad
    }
  }
`;

export const GET_GALLERY_BY_ID_QUERY = gql`
  query GetGallery($id: Int!) {
    galeria(id: $id) {
      id_galeria
      nombre
      email
      telefono
      ciudad
      direccion
      web
      descripcion
      usuario_id
    }
  }
`;

export const UPDATE_GALLERY_MUTATION = gql`
mutation UpdateGallery(
  $id: Int!,
  $usuario_id: Float!,
  $nombre: String!,
  $descripcion: String,
  $direccion: String,
  $ciudad: String,
  $web: String,
  $telefono: String,
  $email: String
) {
  updateGaleria(
    id: $id,
    usuario_id: $usuario_id,
    nombre: $nombre,
    descripcion: $descripcion,
    direccion: $direccion,
    ciudad: $ciudad,
    web: $web,
    telefono: $telefono,
    email: $email
  ) {
    id_galeria
    nombre
  }
}
`;


export const CREATE_ARTIST_MUTATION = gql`
  mutation CreateArtist(
  $nombre: String!
  $biografia: String
  $estilo: String
  $id_galeria: Int
) {
  createArtist(
    input: {
      nombre: $nombre
      biografia: $biografia
      estilo: $estilo
      id_galeria: $id_galeria
    }
  ) {
    id_artista
    nombre
    biografia
    estilo
    galeria {
      id_galeria
      nombre
    }
  }
}
`;

export const GET_ARTIST_BY_ID_QUERY = gql`
  query GetArtistById($id: Float!) {
    artista(id: $id) {
      id_artista
      nombre
      biografia
      estilo
      galeria {
        id_galeria
        nombre
      }
      obras {
        id_obra
        titulo
      }
      exposiciones {
        id_exposicion
        titulo
      }
    }
  }
`;

export const UPDATE_ARTIST_MUTATION = gql`
  mutation UpdateArtist(
    $id: Float!,
    $data: UpdateArtistInput!,
    $id_galeria: Float
  ) {
    updateArtist(id: $id, data: $data, id_galeria: $id_galeria) {
      id_artista
      nombre
      biografia
      estilo
      galeria {
        id_galeria
        nombre
      }
    }
  }
`;

const DELETE_USUARIO = gql`
  mutation DeleteUsuario($id: Int!) {
    deleteUsuario(id: $id)
  }
`;
