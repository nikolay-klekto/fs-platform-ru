'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const useIsAuth = (): boolean => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(!!Cookies.get('accessToken'))
    }, [])

    return isAuth
}
