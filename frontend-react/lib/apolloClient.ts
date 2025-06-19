// import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
// import { createErrorLink, createAuthErrorLink } from "./errorLink";


// const GRAPHQL_ENDPOINT = 'http://45.135.234.61:8282/graphql'

// export function createApolloClient() {
//     const httpLink = new HttpLink({
//       uri: GRAPHQL_ENDPOINT,
//       credentials: 'same-origin', 
//     });
//     const errorLink = createErrorLink();  
//     const authErrorLink = createAuthErrorLink(); 
//     const link = from([authErrorLink, errorLink, httpLink]); 
//     return new ApolloClient({
//       ssrMode: typeof window === 'undefined',
//       link,
//       cache: new InMemoryCache(),
//     });
//   }

import { ApolloClient, from, HttpLink, InMemoryCache,  split } from '@apollo/client';
import { createErrorLink, createAuthErrorLink } from "./errorLink";
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';


const AUTH_ENDPOINT = 'http://45.135.234.61:8282/graphql';
const CARDS_ENDPOINT = 'http://45.135.234.61:8183/graphql';
export function createApolloClient() {
    const authHttpLink = new HttpLink({
    uri: AUTH_ENDPOINT,
    credentials: 'same-origin',
  });

   const cardsHttpLink = new HttpLink({
    uri: CARDS_ENDPOINT,
    credentials: 'same-origin',
  });

  const errorLink = createErrorLink();
  const authErrorLink = createAuthErrorLink();


  const routingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    if (
      definition.kind === 'OperationDefinition' &&
      (definition as OperationDefinitionNode).name?.value?.startsWith('getCards')
    ) {
      return true;
    }
    return false;
  },
  cardsHttpLink,
  authHttpLink
);
const link = from([authErrorLink, errorLink, routingLink]);
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache(),
  });
}

