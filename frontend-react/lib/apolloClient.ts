import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import router from 'next/router';

const GRAPHQL_ENDPOINT = 'http://45.135.234.61:8282/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(`[GraphQL error]: ${err.message}`);
        if (
          err.extensions?.code === 'UNAUTHENTICATED' ||
          err.message.toLowerCase().includes('токен') ||
          err.message.toLowerCase().includes('unauthorized')
        ) {
          console.warn('Ошибка авторизации, удаляем токены');
          Cookies.remove('refreshToken');
          if (typeof window !== 'undefined') {
            router.push('/login'); 
          }
        }
      }
    }
     if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  export function createApolloClient() {
    const httpLink = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: 'same-origin', 
    });
    const link = from([errorLink, httpLink]); 
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link,
      cache: new InMemoryCache(),
    });
  }
