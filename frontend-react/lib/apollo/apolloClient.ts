import { ApolloClient, InMemoryCache, from, ApolloLink, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { createErrorLink, createAuthErrorLinkClient } from './links'

const AUTH_ENDPOINT = 'https://funscrut.online/auth/graphql'
const CARDS_ENDPOINT = 'https://funscrut.online/main/graphql'

function routeByOperationName(name: string) {
    switch (true) {
        case name.startsWith('getCards'):
            return new HttpLink({ uri: CARDS_ENDPOINT, credentials: 'same-origin' })
        default:
            return new HttpLink({ uri: AUTH_ENDPOINT, credentials: 'same-origin' })
    }
}

const routingLink = new ApolloLink((operation, forward) => {
    const def = getMainDefinition(operation.query)
    if (def.kind === 'OperationDefinition' && def.name?.value) {
        return routeByOperationName(def.name.value).request!(operation, forward)
    }
    return routeByOperationName('').request!(operation, forward)
})

export function createApolloServerClient() {
    const links = [createErrorLink(), createAuthErrorLinkClient(), routingLink].filter(Boolean) as ApolloLink[]

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from(links),
        cache: new InMemoryCache(),
    })
}
