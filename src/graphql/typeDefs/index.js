const typeDefs = `
  type Query {
    Products: [Product!]!
    Product(id: ID!): Product! 
    Users: [User!]!
    User(id: ID!): User!
  }

  type Mutation {
    addProduct(name: String! description: String! price: Float! thumbnail: String! count: Int!): Product!
    updateProduct(id: ID! name: String! description: String! price: Float! thumbnail: String! count: Int!): Product!
    removeProduct(id: ID!): ID!
    addReview(user: ID! comment: String rating: Int productId: ID!): Review!
    updateReview(user: ID! comment: String rating: Int productId: ID!): Review!
    deleteReview(user: ID!, productId: ID!): ID!
  }

  type Subscription {
    Products: [Product!]!
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    thumbnail: String!
    createdAt: String
    updatedAt: String
    count: Int!
    stock: Boolean
    price: Float!
    reviews: [Review]
  }

  type Review {
    comment: String
    user: ID
    rating: Int
  }

  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    address: String!
    gender: String!
    age: String!
  }
`;

module.exports = typeDefs;
