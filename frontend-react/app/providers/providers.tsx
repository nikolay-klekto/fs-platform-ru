'use client'

import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '@/lib/apolloLClient'
import { ModalProvider } from '@/context/ContextModal'
import { modals } from '@/modals/modals'

const client = createApolloClient()

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <ModalProvider modals={modals}>{children}</ModalProvider>
        </ApolloProvider>
    )
}
