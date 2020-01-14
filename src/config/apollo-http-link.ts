import { HttpLink } from 'apollo-link-http';

export const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});
