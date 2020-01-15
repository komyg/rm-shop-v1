import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Character = {
   __typename?: 'Character',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  species?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  origin?: Maybe<Location>,
  location?: Maybe<Location>,
  image?: Maybe<Scalars['String']>,
  episode?: Maybe<Array<Maybe<Episode>>>,
  created?: Maybe<Scalars['String']>,
};

export type Characters = {
   __typename?: 'Characters',
  info?: Maybe<Info>,
  results?: Maybe<Array<Maybe<Character>>>,
};

export type Episode = {
   __typename?: 'Episode',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  air_date?: Maybe<Scalars['String']>,
  episode?: Maybe<Scalars['String']>,
  characters?: Maybe<Array<Maybe<Character>>>,
  created?: Maybe<Scalars['String']>,
};

export type Episodes = {
   __typename?: 'Episodes',
  info?: Maybe<Info>,
  results?: Maybe<Array<Maybe<Episode>>>,
};

export type FilterCharacter = {
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  species?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
};

export type FilterEpisode = {
  name?: Maybe<Scalars['String']>,
  episode?: Maybe<Scalars['String']>,
};

export type FilterLocation = {
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  dimension?: Maybe<Scalars['String']>,
};

export type Info = {
   __typename?: 'Info',
  count?: Maybe<Scalars['Int']>,
  pages?: Maybe<Scalars['Int']>,
  next?: Maybe<Scalars['Int']>,
  prev?: Maybe<Scalars['Int']>,
};

export type Location = {
   __typename?: 'Location',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  dimension?: Maybe<Scalars['String']>,
  residents?: Maybe<Array<Maybe<Character>>>,
  created?: Maybe<Scalars['String']>,
};

export type Locations = {
   __typename?: 'Locations',
  info?: Maybe<Info>,
  results?: Maybe<Array<Maybe<Location>>>,
};

export type Query = {
   __typename?: 'Query',
  character?: Maybe<Character>,
  characters?: Maybe<Characters>,
  location?: Maybe<Location>,
  locations?: Maybe<Locations>,
  episode?: Maybe<Episode>,
  episodes?: Maybe<Episodes>,
};


export type QueryCharacterArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryCharactersArgs = {
  page?: Maybe<Scalars['Int']>,
  filter?: Maybe<FilterCharacter>
};


export type QueryLocationArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryLocationsArgs = {
  page?: Maybe<Scalars['Int']>,
  filter?: Maybe<FilterLocation>
};


export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryEpisodesArgs = {
  page?: Maybe<Scalars['Int']>,
  filter?: Maybe<FilterEpisode>
};


export type GetCharactersQueryVariables = {};


export type GetCharactersQuery = (
  { __typename?: 'Query' }
  & { characters: Maybe<(
    { __typename?: 'Characters' }
    & { results: Maybe<Array<Maybe<(
      { __typename: 'Character' }
      & Pick<Character, 'id' | 'name' | 'species'>
      & { origin: Maybe<(
        { __typename: 'Location' }
        & Pick<Location, 'id' | 'name'>
      )>, location: Maybe<(
        { __typename: 'Location' }
        & Pick<Location, 'id' | 'name'>
      )> }
    )>>> }
  )> }
);


export const GetCharactersDocument = gql`
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
    `;
export type GetCharactersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCharactersQuery, GetCharactersQueryVariables>, 'query'>;

    export const GetCharactersComponent = (props: GetCharactersComponentProps) => (
      <ApolloReactComponents.Query<GetCharactersQuery, GetCharactersQueryVariables> query={GetCharactersDocument} {...props} />
    );
    
export type GetCharactersProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCharactersQuery, GetCharactersQueryVariables> & TChildProps;
export function withGetCharacters<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCharactersQuery,
  GetCharactersQueryVariables,
  GetCharactersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCharactersQuery, GetCharactersQueryVariables, GetCharactersProps<TChildProps>>(GetCharactersDocument, {
      alias: 'getCharacters',
      ...operationOptions
    });
};

/**
 * __useGetCharactersQuery__
 *
 * To run a query within a React component, call `useGetCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCharactersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, baseOptions);
      }
export function useGetCharactersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, baseOptions);
        }
export type GetCharactersQueryHookResult = ReturnType<typeof useGetCharactersQuery>;
export type GetCharactersLazyQueryHookResult = ReturnType<typeof useGetCharactersLazyQuery>;
export type GetCharactersQueryResult = ApolloReactCommon.QueryResult<GetCharactersQuery, GetCharactersQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    