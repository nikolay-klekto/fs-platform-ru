import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_MUTATION } from '@/lib/mutations/auth'
import { saveAuthTokens } from '@/lib/saveAuthTokens'

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

    const [registerMutation, { error, loading, client }] = useMutation<IRegisterMutationResponse>(REGISTER_MUTATION, {
        onCompleted: (response) => {
            const registerData = response?.register

            if (registerData?.errorMessage) {
                setCustomError(registerData.errorMessage)
                console.error('Registration error:', registerData.errorMessage)
            }

            if (registerData?.data) {
                saveAuthTokens(registerData.data)
            }
        },
        onError: (err) => {
            setCustomError(err.message || 'Произошла ошибка регистрации')
        },
    })

    const register = async (
        email: string,
        phoneNumber: string,
        password: string,
    ): Promise<{ success: boolean; errorMessage?: string }> => {
        try {
            const response = await registerMutation({
                variables: {
                    email,
                    phoneNumber,
                    password,
                },
            })

            const registerData = response?.data?.register

            if (registerData?.errorMessage) {
                return { success: false, errorMessage: registerData.errorMessage }
            }

            if (registerData?.data) {
                return { success: true }
            }

            return { success: false, errorMessage: 'Неизвестная ошибка регистрации' }
        } catch (err) {
            console.error('Registration error:', err)
            return { success: false, errorMessage: 'Ошибка регистрации, попробуйте позже' }
        }
    }

    return { register, error, loading, client, customError }
}
