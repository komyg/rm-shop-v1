import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import CharacterTable from './components/character-table/character-table';
import { apolloClient } from './config/apollo-client';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <CharacterTable />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
