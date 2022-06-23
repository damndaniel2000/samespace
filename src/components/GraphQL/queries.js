import { gql } from "@apollo/client/core";

export const LOAD_PLAYLISTS = gql`
  query Query {
    getPlaylists {
      id
      title
    }
  }
`;

export const LOAD_CATEGORIES = gql`
  query Query {
    getCategories
  }
`;
