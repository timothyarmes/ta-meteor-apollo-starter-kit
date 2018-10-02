import { ApolloLink } from 'apollo-link'

export const MeteorAccountsLink = () => new ApolloLink((operation, forward) => {
  return forward(operation)
});
