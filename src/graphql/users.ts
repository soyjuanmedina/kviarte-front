import { gql } from 'apollo-angular';

// Users
export const GET_USERS = gql`
  query GetUsuarios {
    usuarios {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const GET_USER = gql`
  query GetUsuario($id: Int!) {
    usuario(id: $id) {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const GET_USERS_BY_ROLE = gql`
  query GetUsuariosPorRol($rol: String!) {
    usuariosPorRol(rol: $rol) {
      id_usuario
      nombre
      email
      rol
    }
  }
`;

export const LOGIN_USER = gql`
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

export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUsuario($id: Int!) {
    deleteUsuario(id: $id)
  }
`;

