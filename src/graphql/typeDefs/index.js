const typeDefs = `
  type Query {
    Products: [Product!]!
    Product(id: ID!): Product! 
    Users(token: String!): [User!]!
    User(token: String! id: ID!): User!
    MyWishList(token: String!): [Cart!]!
    MyCart(token: String!): [Cart!]!
  }

  type Mutation {
    addProduct(token: String! discount: Int! tags: [String!] name: String! description: String! price: Float! thumbnail: String! count: Int!): Product!
    updateProduct(token: String! discount: Int! id: ID! tags: [String!] name: String! description: String! price: Float! thumbnail: String! count: Int!): Product!
    removeProduct(token: String! id: ID!): ID!
    addReview(token: String! user: ID! comment: String rating: Int productId: ID!): Review!
    updateReview(token: String! user: ID! comment: String rating: Int productId: ID!): Review!
    deleteReview(token: String! user: ID!, productId: ID!): ID!
    signUp(name: String! email: String! password: String! age: Int! gender: String! address: String! phone: String!): TokenParams!
    signIn(email: String phone: String password: String!): TokenParams!
    updateUser(token: String! phone: String name: String address: String, gender: String, age: Int): User!
    refreshToken(token: String!): TokenParams!
    changePassword(token: String! newPassword: String! oldPassword: String!): String!
    forgotPassword(email: String! newPassword: String!): String!
    removeUser(token: String! id: ID!): ID!
    addItemToCart(token: String! productId: ID! ): Cart!
    addItemToWishList(token: String! productId: ID!): Cart!
    removeItemFromCart(token: String! cartItemId: ID!): ID!
    removeItemFromWishList(token: String! cartItemId: ID!): ID!
    updateItemDetailsInCart(token: String! productId: ID! count: Int!): Cart!
  }

  type TokenParams {
    token: String!
    expiresIn: String!
  }

  type Subscription {
    Products: [Product!]!
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    thumbnail: String!
    createdAt: String!
    updatedAt: String!
    count: Int!
    stock: Boolean
    price: Float!
    reviews: [Review]
    discount: Int!
    tags: [String!]
  }

  type Review {
    comment: String
    user: ID
    rating: Int
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    address: String!
    gender: String!
    age: String!
    token: String!
    expiresIn: String!
    phone: String!
    createdAt: String!
    updatedAt: String!
  }

  type Cart {
    _id: ID!
    userId: ID!
    productId: ID!
    inWishList: Boolean
    inCart: Boolean
    count: Int
    discount: String
    deliveryCharge: Int
    deliveryTime: String
    deliveryStatus: String
  }

  type Payment {
    _id: ID!
    userId: ID!
    itemIds: [ID!]!
    name: String!
    totalPayable: Int!
    totalDiscount: String!
    paymentMethod: String!
  }
`;

module.exports = typeDefs;
