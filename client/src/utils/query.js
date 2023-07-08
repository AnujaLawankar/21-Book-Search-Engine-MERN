import { gql } from "@apollo/client";



export const GET_ME = gql`
  query me {
    _id
    username
    email
   
  }
`;

export const QUERY_BOOK = gql`
  query books {
    books {
      _id
      authors
      description
      image
      link
      title
    }
  }
`;

export const QUERY_USER = gql`
  query users($_id: String) {
    users(_id: $_id) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;