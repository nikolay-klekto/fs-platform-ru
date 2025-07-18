import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/lib/mutations/auth'
import { saveAuthTokens } from '@/lib/saveAuthTokens'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, CLIENT_ID_KEY } from '@/lib/constants/auth'

interface ILoginResponse {
    data?: {
        accessToken: string
        refreshToken: string
        clientId: string
    }
    errorMessage?: string
}

interface ILoginMutationResponse {
    login: ILoginResponse
}

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [loginMutation] = useMutation<ILoginMutationResponse>(LOGIN_MUTATION)

    const clearAuthCookies = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        Cookies.remove(CLIENT_ID_KEY)
    }

    const login = async (email: string, password: string): Promise<{ success: boolean; errorMessage?: string }> => {
        setLoading(true)
        setError(null)

        try {
            const { data } = await loginMutation({
                variables: { email, password },
            })

            if (!data?.login) {
                throw new Error('No response data')
            }

            if (data.login.errorMessage) {
                clearAuthCookies()
                setError(data.login.errorMessage)
                return { success: false, errorMessage: data.login.errorMessage }
            }

            if (!data.login.data) {
                throw new Error('No authentication data received')
            }

            saveAuthTokens(data.login.data)
            return { success: true }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка при входе'
            clearAuthCookies()
            setError(errorMessage)
            return { success: false, errorMessage }
        } finally {
            setLoading(false)
        }
    }

    return { login, error, loading }
}
