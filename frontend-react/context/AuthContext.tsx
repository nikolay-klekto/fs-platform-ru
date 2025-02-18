'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
    clientId: string | null
    jwtToken: string | null
    refreshToken: string | null
    setAuthData: (data: { clientId: string; jwtToken: string; refreshToken: string }) => void
    clearAuthData: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [clientId, setClientId] = useState<string | null>(null)
    const [jwtToken, setJwtToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    const setAuthData = ({
        clientId,
        jwtToken,
        refreshToken,
    }: {
        clientId: string
        jwtToken: string
        refreshToken: string
    }) => {
        setClientId(clientId)
        setJwtToken(jwtToken)
        setRefreshToken(refreshToken)
        localStorage.setItem('jwtToken', jwtToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('clientId', clientId)
    }

    const clearAuthData = () => {
        setClientId(null)
        setJwtToken(null)
        setRefreshToken(null)
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('clientId')
    }

    return (
        <AuthContext.Provider value={{ clientId, jwtToken, refreshToken, setAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    )
}
