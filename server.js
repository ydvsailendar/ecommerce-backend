const { GraphQLServer } = require('graphql-yoga');

const dinnerOptions = ['🍕', '🌭', '🍔', '🥗', '🍣'];

const typeDefs = `
  type Query {
    whatsForDinner: String!
  }
`;

const resolvers = {
  Query: {
    whatsForDinner: () => {
      const idx = Math.floor(Math.random() * dinnerOptions.length);
      const foodChoice = dinnerOptions[idx];
      return `Tonight we eat ${foodChoice}`;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log(`😄 Server running at http://localhost:4000`);
});
