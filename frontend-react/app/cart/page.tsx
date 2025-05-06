'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ShoppingCartPageDesktop from '@/components/desktop/pageDesktop/ShoppingCartPageDesktop/ShoppingCartPageDesktop'
import ShoppingCartPageMobi from '@/components/mobi/pageMobi/ShoppingCartPageMobi/ShoppingCartPageMobi'

export default function Companies() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    if (!isClient) {
        return null
    }
    return (
        <div>
            {isDesktop ? (
                <>
                    <main className="min-h-screen bg-[#101030] text-white">
                        <ShoppingCartPageDesktop />
                    </main>
                </>
            ) : (
                <>
                    <main className="bg-[#101030] text-white">
                        <ShoppingCartPageMobi />
                    </main>
                </>
            )}
        </div>
    )
}
