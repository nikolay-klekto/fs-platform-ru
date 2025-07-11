'use client'
import Cookies from 'js-cookie'

export const useIsAuth = (): boolean => {
    return typeof window !== 'undefined' && !!Cookies.get('accessToken')
}
