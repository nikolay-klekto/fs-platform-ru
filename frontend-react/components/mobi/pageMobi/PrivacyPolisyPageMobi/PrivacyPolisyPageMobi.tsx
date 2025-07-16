'use client'

import React, { useState, useEffect } from 'react'
import HeaderMobi from '../../layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'

const PrivacyPolisyPageMobi: React.FC = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <>
            <HeaderMobi />
            <main>Контент</main>
            <FooterMobi />
        </>
    )
}

export default PrivacyPolisyPageMobi
