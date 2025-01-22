'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { contentFooterDesktop, contentFooterDesktopImages } from './contentFooterDesktop'
import { LogoIconDesktop } from '@/components/assets/icons'

const FooterDesktop: React.FC = () => {
    return (
        <>
            <footer
                className="flex items-center h-[521px]"
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.5), rgba(16,16,48,0.5)), url(/background/bgFooterDesktop.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="relative container">
                    <div className="absolute 2xl:hidden">
                        <LogoIconDesktop className="w-[71px] h-[59px]" />
                    </div>
                    <div className="flex justify-center pl-24 pr-24 pb-10 2xl:px-0">
                        <div className="flex justify-between w-full max-w-[1190px]">
                            {contentFooterDesktop.map((section) => (
                                <div key={section.id}>
                                    <p className="text-white text-4xl font-bold pb-7">{section.title}</p>
                                    <ul>
                                        {section.links.map((link) => (
                                            <li
                                                key={link.id}
                                                className={`text-white text-2xl font-medium ${link.id !== section.links.length ? 'pb-5' : ''} `}
                                            >
                                                <Link href={link.href}>{link.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {section.icons && (
                                        <div className="flex justify-between max-w-[112px] pt-5">
                                            {section.icons.map((icon) => (
                                                <a
                                                    key={icon.id}
                                                    href={icon.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {icon.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-custom-grey rounded-full"></div>
                    <div className="flex flex-col items-center justify-between h-[162px] mt-10 pl-24 pr-24 2xl:px-0">
                        <div className="flex justify-between items-center w-full max-w-[1190px]">
                            {contentFooterDesktopImages.map((image) => (
                                <Image
                                    key={image.id}
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                />
                            ))}
                        </div>
                        <p className="max-w-[896px] custom-grey text-2xl font-medium text-center pt-7 pb-4">
                            ООО “Надежные программы” УНП 100160363. 220006, Республика Беларусь, г. Минск, ул. Аранская
                            8, блок 1, эт. 4 Свидетельство о госдарственной регистрации №100160363, выдано Минским
                            горисполкомом 26.10.2023 г. Интернет-магазин включен в Торговый реестр Республики Беларусь
                            01.01.2001 за №111111
                        </p>
                        <p className="text-white text-2xl font-medium text-center mb-5">
                            funscrut .by © 2023, ООО «funscrut» УНП 000000000
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterDesktop
