import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'http://45.135.234.61:8282/graphql'

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: GRAPHQL_ENDPOINT,
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
    })
}
