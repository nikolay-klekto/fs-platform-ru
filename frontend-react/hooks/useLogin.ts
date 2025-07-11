import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Cookies from 'js-cookie'

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

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(client: { email: $email, password: $password }) {
            data {
                accessToken
                refreshToken
                clientId
            }
            errorMessage
        }
    }
`

// `
// mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//         data {
//             accessToken
//             refreshToken
//             clientId
//         }
//         errorMessage
//     }
// }
// `

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const [loginMutation] = useMutation<ILoginMutationResponse>(LOGIN_MUTATION)

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
                setError(data.login.errorMessage)
                return { success: false, errorMessage: data.login.errorMessage }
            }

            if (!data.login.data) {
                throw new Error('No authentication data received')
            }

            Cookies.set('accessToken', data.login.data.accessToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            Cookies.set('refreshToken', data.login.data.refreshToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            Cookies.set('clientId', data.login.data.clientId, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })

            return { success: true }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка при входе'
            setError(errorMessage)
            return { success: false, errorMessage }
        } finally {
            setLoading(false)
        }
    }

    return { login, error, loading }
}
