const typeDefs = `
  type Query {
    Products: [Product!]!
    Product(id: ID!): Product! 
    Users: [User!]!
    User(id: ID!): User! 
  }

  type Product {
    name: String!
    description: String!
    thumbnail: String!
    createdAt: String!
    updatedAt: String!
    count: Int!
    stock: Boolean!
    price: Float!
    review: [Review!]
  }

  type Review {
    comment: String
    user: String!
    rating: Int
  }

  type User {
    name: String!
    email: String!
    password: String!
    address: String!
    gender: String!
    age: String!
  }
`;

module.exports = typeDefs;
