const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
        }

    type Books {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: image
        link: link

    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String]!, description: String!, title: String!, bookId: Int!, image: image, link: link ): User
        removeBook(bookId: Int!): User
    }
`