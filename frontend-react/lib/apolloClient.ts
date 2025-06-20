
import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { createErrorLink, createAuthErrorLink } from './errorLink'
import { getMainDefinition } from '@apollo/client/utilities'

const AUTH_ENDPOINT = 'http://45.135.234.61:8282/graphql'
const CARDS_ENDPOINT = 'http://45.135.234.61:8183/graphql'

export function createApolloClient() {
    const authHttpLink = new HttpLink({
        uri: AUTH_ENDPOINT,
        credentials: 'same-origin',
    })

    const cardsHttpLink = new HttpLink({
        uri: CARDS_ENDPOINT,
        credentials: 'same-origin',
    })

    const errorLink = createErrorLink()
    const authErrorLink = createAuthErrorLink()

    
    function routeByOperationName(name: string) {
        switch (true) {
            case name.startsWith('getCards'):
                return cardsHttpLink
            default:
                return authHttpLink
        }
    }

    const routingLink = new ApolloLink((operation, forward) => {
        const definition = getMainDefinition(operation.query)

        if (definition.kind === 'OperationDefinition' && definition.name?.value) {
            const selectedLink = routeByOperationName(definition.name.value)
            return selectedLink.request(operation, forward)
        }

        return authHttpLink.request(operation, forward)
    })

    const link = from([authErrorLink, errorLink, routingLink])

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link,
        cache: new InMemoryCache(),
    })
}
