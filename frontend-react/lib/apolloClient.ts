import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { createErrorLink, createAuthErrorLink } from './errorLink'

const GRAPHQL_ENDPOINT = 'http://45.135.234.61:8282/graphql'

export function createApolloClient() {
    const httpLink = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: 'same-origin',
    })
    const errorLink = createErrorLink()
    const authErrorLink = createAuthErrorLink()
    const link = from([authErrorLink, errorLink, httpLink])
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link,
        cache: new InMemoryCache(),
    })
}
