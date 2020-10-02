const { GraphQLServer } = require('graphql-yoga');

const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log(`😄 Server running at http://localhost:4000`);
});
