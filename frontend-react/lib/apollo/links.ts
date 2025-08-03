import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'

export const createErrorLink = () => {
    return onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((err) => {
                console.error(`[GraphQL error]: ${err.message}`)
            })
        }
        if (networkError) {
            console.error(`[Network error]: ${networkError}`)
        }
    })
}

export const createAuthErrorLinkClient = () => {
    return onError(({ graphQLErrors }) => {
        if (!graphQLErrors) return

        graphQLErrors.forEach((err) => {
            if (
                err.extensions?.code === 'UNAUTHENTICATED' ||
                err.message.toLowerCase().includes('токен') ||
                err.message.toLowerCase().includes('unauthorized')
            ) {
                console.warn('Ошибка авторизации')
                Cookies.remove('refreshToken')

                if (typeof window !== 'undefined') {
                    window.location.href = '/login'
                }
            }
        })
    })
}
