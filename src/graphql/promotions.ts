import { gql } from 'apollo-angular';

// Obtener todas las promociones
export const GET_PROMOTIONS = gql`
  query GetPromotions {
    promotions {
      id
      code
      description
      discount
      active
      startDate
      endDate
      gallery {
        id
        name
      }
      artworks {
        id
        title
        picture
      }
    }
  }
`;

// Obtener una promoción por ID
export const GET_PROMOTION = gql`
  query GetPromotion($id: Int!) {
    promotion(id: $id) {
      id
      code
      description
      discount
      active
      startDate
      endDate
      gallery {
        id
        name
      }
      artworks {
        id
        title
        picture
      }
    }
  }
`;

// Crear una promoción
export const CREATE_PROMOTION = gql`
  mutation CreatePromotion($input: CreatePromotionInput!) {
    createPromotion(input: $input) {
      id
      code
      description
      discount
      active
      startDate
      endDate
      gallery {
        id
        name
      }
      artworks {
        id
        title
        picture
      }
    }
  }
`;

// Actualizar una promoción
export const UPDATE_PROMOTION = gql`
  mutation UpdatePromotion($id: Int!, $input: UpdatePromotionInput!) {
    updatePromotion(id: $id, input: $input) {
      id
      code
      description
      discount
      active
      startDate
      endDate
      gallery {
        id
        name
      }
      artworks {
        id
        title
        picture
      }
    }
  }
`;

// Eliminar una promoción
export const DELETE_PROMOTION = gql`
  mutation DeletePromotion($id: Int!) {
    removePromotion(id: $id)
  }
`;
