import { gql } from 'apollo-angular';

export const USER_BY_ROLE_QUERY = gql`
          query GetUsuariosPorRol($rol: String!) {
            usuariosPorRol(rol: $rol) {
              id_usuario
              nombre
              email
              rol
            }
          }
        `;