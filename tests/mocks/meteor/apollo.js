import { ApolloLink } from 'apollo-link';

export const MeteorAccountsLink = () => new ApolloLink((operation, forward) => forward(operation));
