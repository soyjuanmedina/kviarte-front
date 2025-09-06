import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;


export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;
