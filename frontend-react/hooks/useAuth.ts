import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_MUTATION } from '@/lib/graphql/mutations/auth'
import { saveAuthTokens } from '@/lib/saveAuthTokens'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, CLIENT_ID_KEY } from '@/lib/constants/auth'

interface IRegisterResponse {
    data?: {
        accessToken: string
        refreshToken: string
        clientId: string
    }
    errorMessage?: string
}

interface IRegisterMutationResponse {
    register: IRegisterResponse
}

export const useAuth = () => {
    const [customError, setCustomError] = useState<string | null>(null)
    const [registerMutation, { error, loading, client }] = useMutation<IRegisterMutationResponse>(REGISTER_MUTATION)

    const clearAuthCookies = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        Cookies.remove(CLIENT_ID_KEY)
    }

    const register = async (
        email: string,
        phoneNumber: string,
        password: string,
    ): Promise<{ success: boolean; errorMessage?: string }> => {
        setCustomError(null)

        try {
            const { data } = await registerMutation({
                variables: { email, phoneNumber, password },
            })

            const registerData = data?.register

            if (registerData?.errorMessage) {
                clearAuthCookies()
                setCustomError(registerData.errorMessage)
                return { success: false, errorMessage: registerData.errorMessage }
            }

            if (registerData?.data) {
                saveAuthTokens(registerData.data)
                return { success: true }
            }

            setCustomError('Неизвестная ошибка регистрации')
            clearAuthCookies()
            return { success: false, errorMessage: 'Неизвестная ошибка регистрации' }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка регистрации'
            setCustomError(message)
            clearAuthCookies()
            return { success: false, errorMessage: message }
        }
    }

    return { register, error, loading, client, customError }
}
