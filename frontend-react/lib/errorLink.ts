
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import router from 'next/router';

export const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(`[GraphQL error]: ${err.message}`);
        if (networkError) {
          console.error(`[Network error]: ${networkError}`);
        }
      }
    }
  });
};

export const createAuthErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(`[GraphQL error]: ${err.message}`);
        if (
          err.extensions?.code === 'UNAUTHENTICATED' ||
          err.message.toLowerCase().includes('токен') ||
          err.message.toLowerCase().includes('unauthorized')
        ) {
          console.warn('Ошибка авторизации');
          Cookies.remove('refreshToken');
          if (typeof window !== 'undefined') {
            router.push('/login');        }
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
};
