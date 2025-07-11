import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const publicClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://45.135.234.61:8183/graphql',
        credentials: 'omit',
    }),
    cache: new InMemoryCache(),
})
