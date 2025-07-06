'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ShoppingCartPageDesktop from '@/components/desktop/pageDesktop/ShoppingCartPageDesktop/ShoppingCartPageDesktop'
import ShoppingCartPageMobi from '@/components/mobi/pageMobi/ShoppingCartPageMobi/ShoppingCartPageMobi'

export default function Cart() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isDesktop = useMediaQuery({
        query: '(min-width: 1240px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <ShoppingCartPageDesktop />
                </>
            ) : (
                <>
                    <ShoppingCartPageMobi />
                </>
            )}
        </div>
    )
}
