import { InMemoryCache } from 'apollo-cache-inmemory';

export const localCache = new InMemoryCache({
  freezeResults: true,
});
