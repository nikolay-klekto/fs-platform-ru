'use client'

import React from 'react'
import Link from 'next/link'

const FooterDesktop: React.FC = () => {
    return (
        <>
            <footer
                className="border border-red-500 border-solid"
                style={{
                    backgroundColor: 'rgb(16, 16, 48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.5), rgba(16,16,48,0.5)), url(/background/footerBackground.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="flex max-w-[1190px] border border-red-500 border-solid">
                    <div>
                        <p className="text-white text-4xl font-semibold">Информация</p>
                        <ul>
                            <li className="text-white text-2xl font-medium">
                                <Link href="#">Главная</Link>
                            </li>
                            <li className="text-white text-2xl font-medium">
                                <Link href="#">Профессии</Link>
                            </li>
                            <li className="text-white text-2xl font-medium">
                                <Link href="#">Компании</Link>
                            </li>
                            <li className="text-white text-2xl font-medium">
                                <Link href="#">Мероприятия</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterDesktop
