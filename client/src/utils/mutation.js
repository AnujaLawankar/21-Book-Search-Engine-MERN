import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: CreateUserInput!) {
    createUser(input: $input) {
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

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
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
    deleteBook(bookId: $bookId) {
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
