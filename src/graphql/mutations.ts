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
    $usuarioId: Float!
    $nombre: String!
    $descripcion: String
    $direccion: String
    $ciudad: String
    $web: String
    $email_contacto: String
    $telefono: String
    $email: String
  ) {
    createGaleria(
      usuarioId: $usuarioId
      nombre: $nombre
      descripcion: $descripcion
      direccion: $direccion
      ciudad: $ciudad
      web: $web
      email_contacto: $email_contacto
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
