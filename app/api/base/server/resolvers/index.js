import GraphQLJSON from 'graphql-type-json';
import DateTime from './datetime';

// Base namespace resolvers
const resolvers = {
  DateTime,
  JSON: GraphQLJSON,
};

export default resolvers;
