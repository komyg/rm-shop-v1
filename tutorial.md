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
yarn add @apollo/react-hooks graphql apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link graphql-tag
```

### Configuring the Apollo Client

Now that we've added all the necessary Apollo package we have to initialize the Apollo Client. For this tutorial we are going to use the [Rick and Morty API](https://rickandmortyapi.com/graphql). Click on [this link](https://rickandmortyapi.com/graphql) to see the playground with the graphql schema and the available data.

Create a folder called *config* to place the Apollo configuration file. It will contain all our configs for the Apollo Client.

>Note: I've chosen to separate each configuration in its own file. I believe this makes it easier to read each of them, but you could use a single file as the documentation suggest. Also, I did not chose to use the Apollo Boost.

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

Now that we have added all necessary packages, let's create our first graphql query to retrieve all characters from the Rick and Morty API. To do this, create a folder called *graphql* inside our *src* folder. Here we will add all of our *.graphql* files. Next, create a new file called: *get-all-characters.query.graphql* and paste the contents below:

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

Now run the Graphql Codegen to generate the typescript types:

```bash
yarn gen-graphql
```

If the command ran successfully, you should see that a *graphql.tsx* file was created inside our *generated* folder and that it contains our query.