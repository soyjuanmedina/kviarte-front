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
