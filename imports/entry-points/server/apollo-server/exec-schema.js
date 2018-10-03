import { mergeTypes } from 'merge-graphql-schemas';
import merge from 'lodash/merge';
import * as APIs from '/imports/api';

// Filter out those APIs for which 'types' and 'resolvers' are defined. In the
// end we'll get something like the following:
// const allTypes = [Base.types, Users.types, ...];
// const allResolvers = [Base.resolvers, Users.resolvers, ...];
const allTypes = [];
const allResolvers = [];
let maybeMocks = null;

const keys = Object.keys(APIs);
const { length } = keys;

for (let i = 0; i < length; i += 1) {
  const key = keys[i];
  const { types, resolvers } = APIs[key];

  if (types && resolvers) {
    allTypes.push(types);
    allResolvers.push(resolvers);
  }
}

if (process.env.NODE_ENV === 'test') {
  maybeMocks = {
    DateTime: () => (new Date()),
  };
}

// Merge all types and resolvers from APIs to create our executable schema
export const typeDefs = mergeTypes(allTypes);
export const resolvers = merge(...allResolvers);
export const mocks = maybeMocks;
