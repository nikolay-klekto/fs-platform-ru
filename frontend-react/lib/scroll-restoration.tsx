'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRestoration() {
    const pathname = usePathname()

    useEffect(() => {
        if (document.scrollingElement) {
            document.scrollingElement.scrollTo(0, 0)
        }
    }, [pathname])

    return null
}
