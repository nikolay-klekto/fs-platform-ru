'use client'

import React, { ReactNode, useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '@/lib/apolloLClient'

interface IApolloProviderWrapper {
    children: ReactNode
}

export default function ApolloProviderWrapper({ children }: IApolloProviderWrapper): JSX.Element {
    const client = useMemo(() => createApolloClient(), [])
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
