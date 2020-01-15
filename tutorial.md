# Part 1: Creating an App using React and Apollo Graphql

This is a three part tutorial series in which we will build a simple shopping cart app using React and [Apollo Graphql](https://www.apollographql.com/):

- Part 1: Retrieve and display data from a remote server.
- Part 2: Use Apollo to manage the app's local state.
- Part 3: Add unit tests.

> Note: this tutorial assumes that you have a working knowledge of React and Typescript.

# Getting Started

To get started, create a new React App using the [CRA - Create React App](https://create-react-app.dev/) tool:

```bash
yarn create react-app sw-shop-v1 --template typescript
```

## Material UI

To make our App prettier we will use the [Material UI](https://material-ui.com/):

```bash
yarn add @material-ui/core
```

## Apollo Graphql

Add the necessary packages from [Apollo](https://www.apollographql.com/):

```bash
yarn add graphql apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link graphql-tag  apollo-cache apollo-utilities @apollo/react-hoc @apollo/react-components @apollo/react-hooks
```

### Creating the Apollo Client

Now that we've added all the necessary Apollo package we have to initialize the Apollo Client. For this tutorial we are going to use the [Rick and Morty API](https://rickandmortyapi.com/graphql). Click on [this link](https://rickandmortyapi.com/graphql) to see the playground with the graphql schema and the available data.

Create a folder called *config* to place the Apollo configuration file. It will contain all our configs for the Apollo Client.

>Note: I've chosen to separate each configuration in its own file. I believe this makes it easier to read each of them, but you could use a single file as the documentation suggest. Also, I did not choose to use the Apollo Boost.

#### Configuring Apollo HTTP Link

The Apollo HTTP link handles the connection between the client app and the Graphql server. Let's create a new config file called: apollo-http-link.ts and add the contents below:

```typescript
import { HttpLink } from 'apollo-link-http';

export const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});
```

The `uri` param is the endpoint that contains the graphql API that we are using.

#### Configuring the Apollo Error Link

The Apollo Error Link receives and logs any errors that may occur in the Graphql calls. Create a new config file named: *apollo-error-link.ts* and paste the contents below:

```typescript
import { onError } from 'apollo-link-error';

export const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
        operation,
        response
      );
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`, operation, response);
  }
});
```

Notice that the errors here are split into two kinds: **Grapqhl Errors** and **Network Error**. The first kind concerns errors that occur in queries and mutations, such as constraint errors while saving data, incorrect data formats, etc. The second kind concerns errors that occur in the network and on the POST requests made by the Apollo, such as timeouts, any error code >= 400 such as unauthorized, forbidden, service unavailable, internal server error, etc.

If you have any error reporting tool, like [Sentry](https://sentry.io/), this is a good place to add them.

#### Configuring the Local Cache

The `InMemoryCache` is a module that stores the results of the queries and mutations locally so that you don't have to go to the server twice to get the same results. It can also be used for the application state management as we will see in the next parts of this tutorial. For now, create a new file named *apollo-local-cache.ts* and paste these contents:

```typescript
import { InMemoryCache } from 'apollo-cache-inmemory';

export const localCache = new InMemoryCache({
  freezeResults: true,
});
```

The current version of Apollo doesn't require that the cached data be immutable, but we can get a performance boost if we design our cache this way. The `freezeResults` parameter helps us make sure our data is immutable, by throwing an error if we try to change an existing object while running our app in development mode.

#### Configuring the Apollo Client

Now we will configure the Apollo Client itself and import the configurations we made above. To do this, first create a new file called: *apollo-client.ts* and then paste the contents below:

```ts
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { httpLink } from './apollo-http-link';
import { errorLink } from './apollo-error-lnk';
import { localCache } from './apollo-local-cache';

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  connectToDevTools: process.env.NODE_ENV !== 'production',
  cache: localCache,
  assumeImmutableResults: true,
});
```

Here we imported the configurations we made on the other files:

- First we create the `ApolloClient` using its constructor and pass a configuration object to it.
- The first parameter of the configuration is the `ApolloLink`. It works as a chain of link objects that will either:

  - Receive the request, transform it and pass it forward.
  - Receive the request and pass it forward as it is.
  - Receive the request, execute it and return the result to the previous objects in the chain.

  In our case, we have just two links: the `errorLink` and the `httpLink`. Notice that the order here is important, because we want the `errorLink` to capture any errors that are returned by the `httpLink`, so the `errorLink` must come before it.

  You can have as many links as you want, for example: `link: ApolloLink.from([authLink, errorLink, timeoutLink, restLink, httpLink])`. In this example, the `authLink` must come first, because it adds an `Authentication` header that is used to make all the requests. Then comes the `errorLink` to capture and log all the errors thrown further down the chain. Then we have the `timeoutLink` that will return an error if the requests made down the chain take longer than a specified period of time. Then we have the `restLink` that is used to make rest calls and finally we have the `httpLink` that handles the Graphql requests.

- The second parameter in the configuration is the `connectToDevTools`. It is active only on non production environments and it allows the [Apollo Dev Tools](https://github.com/apollographql/apollo-client-devtools) to work.
- The third parameter is the `InMemoryCache`.
- The last parameter is `assumeImmutableResults: true`, it tells the Apollo Client that we intend to make our cached data immutable for a performance gain. Please note that we have to enforce the immutability by ourselves, but the parameter `freezeResults` that we configured on the `InMemoryCache` will help us do this, by throwing an error if we try to change an immutable object while on development.

### The Apollo Provider

Now that we have successfully configured the Apollo Client, we have to add the `ApolloProvider` so that all of our components can access it. To do this, we will change our *index.tsx* file to:

```tsx
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { apolloClient } from './config/apollo-client';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

## Graphql Codegen

The [Graphql Codegen](https://graphql-code-generator.com/) is a tool that automatically generates typescript types and classes based on your Grapqhql Schema. It is very useful to ensure type safety.

### Configuring the Grapqhl Codegen

The Grapqhl Codegen comes with a CLI tool that helps you create a configuration file. To use it follow these steps:

Install the CLI:

```bash
yarn add -D @graphql-codegen/cli

```

Execute the wizard:

```bash
yarn graphql-codegen init
```

Choose the following options:

1. Application built with React.
2. For this tutorial we will use the [Rick and Morty Graphql API](https://rickandmortyapi.com/graphql). Its endpoint is this one: https://rickandmortyapi.com/graphql.
3. Use the default value (`src/**/*.graphql`) for the fragment and operations.
4. Then pick the following plugins:
    - TypeScript
    - TypeScript Operations
    - TypeScript React Apollo
    - Introspection Fragment Matcher
5. Use the default value for the output (`src/generated/graphql.tsx`).
6. Answer *no* when it asks if you want to generate an instrospection file.
7. Use the default value for the name of the config file (`codegen.yml`).
8. Type in `gen-graphql` when it asks the name of the script in the *package.json` that will be used to generate the graphql files.

After the wizard finishes, run `yarn install` to install all the necessary plugins added by the Grapqhl Code Gen.

Now, open your *codegen.yml* file and add the `config` param to tell the codegen that we want to use hooks. The final file looks like the one below:

```yml
overwrite: true
schema: "https://rickandmortyapi.com/graphql"
documents: "src/**/*.graphql"
generates:
  src/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
      - "fragment-matcher"

    # Add this to use hooks:
    config:
      withHooks: true
```

# Creating Our First Query

Now that we have added all necessary packages, let's create our first graphql query to retrieve all characters from the Rick and Morty API. To do this, create a folder called *graphql* inside our *src* folder. Here we will add all of our *.graphql* files. Next, create a new file called: *get-characters.query.graphql* and paste the contents below:

```graphql
query GetCharacters {
  characters {
    results {
      id
      __typename
      name
      species
      origin {
        id
        __typename
        name
      }
      location {
        id
        __typename
        name
      }
    }
  }
}
```

>Note: I have added the `id` and `__typename` parameters to our query, even though they are not necessary at this point in our tutorial. I did this, because we will use the `id` field later and because the Apollo Dev Tools needs to have both parameters to show what is in our cache.

Now run the Graphql Codegen to generate the typescript types:

```bash
yarn gen-graphql
```

If the command ran successfully, you should see that a *graphql.tsx* file was created inside our *generated* folder and that it contains our query.

## Displaying the query data

Now that we have our first query, we would like to display its data. To do this, create a new folder called *src/components*.

### Creating the character table

Create a new folder: *src/components/character-table* and create the file: *character-table.tsx* inside it. This component will create the table element, its headers and execute a query to our backend to retrieve the character data, it will then pass this data to another component that is responsible for display the table rows.

Add the following to the *character-table.tsx* file:

