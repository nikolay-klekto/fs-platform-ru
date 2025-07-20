import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, CLIENT_ID_KEY } from './constants/auth'

export const saveAuthTokens = ({
    accessToken,
    refreshToken,
    clientId,
}: {
    accessToken: string
    refreshToken: string
    clientId: string
}) => {
    const options = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
    }

    Cookies.set(ACCESS_TOKEN_KEY, accessToken, options)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, options)
    Cookies.set(CLIENT_ID_KEY, clientId, options)
}
