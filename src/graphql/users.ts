import { gql } from 'apollo-angular';

// Obtener todos los usuarios
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      registrationDate
      galleries {
        id
        name
        description
        city
        website
        phone
        email
        picture
      }
    }
  }
`;

// Obtener un usuario por id
export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      role
      registrationDate
      galleries {
        id
        name
        description
        city
        website
        phone
        email
        picture
      }
    }
  }
`;

// Obtener usuarios por rol
export const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($role: String!) {
    usersByRole(role: $role) {
      id
      name
      email
      role
      registrationDate
      galleries {
        id
        name
        description
        city
        website
        phone
        email
        picture
      }
    }
  }
`;

// Borrar usuario
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;
