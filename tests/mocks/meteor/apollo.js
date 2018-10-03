import { ApolloLink } from 'apollo-link';

// eslint-disable-next-line import/prefer-default-export
export const MeteorAccountsLink = () => new ApolloLink((operation, forward) => forward(operation));
