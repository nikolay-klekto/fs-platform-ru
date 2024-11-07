'use client'

import React from 'react'
import Link from 'next/link'

import { content } from './content'

import { TelegramIcon } from '@/components/assets/icons'

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
                <div className="container flex gap-[234px]  border border-red-500 border-solid">
                    <TelegramIcon className="w-[71px] h-[59px]" />
                    <div className="flex w-[1190px] justify-between border border-red-500 border-solid">
                        {content.map((section) => (
                            <div key={section.id}>
                                <p className="text-white text-4xl font-semibold">{section.title}</p>
                                <ul>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex} className="text-white text-2xl font-medium">
                                            <Link href={link.href}>{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                                {section.icons && (
                                    <div className="flex justify-between max-w-[112px]  pt-[18px]">
                                        {section.icons.map((icon, iconIndex) => (
                                            <a
                                                key={iconIndex}
                                                href={icon.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {icon.icon}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div></div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterDesktop
