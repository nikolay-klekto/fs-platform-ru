'use client'

import React, { ReactNode, useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import { createApolloServerClient } from '@/lib/apollo/apolloClient'

interface IApolloProviderWrapper {
    children: ReactNode
}

export default function ApolloProviderWrapper({ children }: IApolloProviderWrapper): JSX.Element {
    const client = useMemo(() => createApolloServerClient(), [])
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
