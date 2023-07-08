const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {

    _id:ID!
    authors: String
    description: String!
    image:String
    link: String
    title: String
    

}

type User {

    _id:ID!
    username: String!
    email:String!
    password:String!
    savedBooks: [Book]
    bookCount: Int
}

input CreateUserInput {
    username: String!
    email: String!
    password: String!
}

type Query {

    books:[Book]
    users: [User]
    user(id: ID!): User

}
type Mutation {
    createUser(input: CreateUserInput!): User
    saveBook(input: BookInput!): User
    deleteBook(bookId: ID!): User
}

input BookInput {
    authors: [String]
    description: String!
    image: String
    link: String
    title: String
}

`;


module.exports = typeDefs;