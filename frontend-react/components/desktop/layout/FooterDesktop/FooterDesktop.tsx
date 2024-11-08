'use client'

import React from 'react'
import Link from 'next/link'

import { content } from './content'
import { TelegramIcon } from '@/components/assets/icons'

const FooterDesktop: React.FC = () => {
    return (
        <>
            <footer
                className="flex items-center h-[521px] border border-red-500 border-solid"
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.5), rgba(16,16,48,0.5)), url(/background/footerBackground.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="relative container border border-green-500 border-solid">
                    <div className="absolute">
                        <TelegramIcon className="w-[71px] h-[59px]" />
                    </div>
                    <div className="flex justify-center pl-28 pr-12 pb-10 border border-green-500 border-solid">
                        <div className="flex justify-between w-full max-w-[1190px] border border-red-500 border-solid">
                            {content.map((section) => (
                                <div key={section.id}>
                                    <p className="text-white text-4xl font-bold pb-7">{section.title}</p>
                                    <ul>
                                        {section.links.map((link, linkIndex) => (
                                            <li
                                                key={linkIndex}
                                                className={`text-white text-2xl font-medium ${linkIndex !== section.links.length - 1 ? 'pb-5' : ''} `}
                                            >
                                                <Link href={link.href}>{link.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {section.icons && (
                                        <div className="flex justify-between max-w-[112px] pt-5">
                                            {section.icons.map((icon, iconIndex) => (
                                                <a
                                                    key={iconIndex}
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
                    <div className="w-full h-[2px] bg-[#878797] rounded-full"></div>
                    <div className="flex flex-col items-center justify-between h-[162px] mt-12 border border-green-500 border-solid">
                        <div className="flex justify-between max-w-[1190px] custom-grey">Тут будут иконки</div>
                        <p className="max-w-[896px] custom-grey text-2xl font-medium text-center">
                            ООО “Надежные программы” УНП 100160363. 220006, Республика Беларусь, г. Минск, ул. Аранская
                            8, блок 1, эт. 4 Свидетельство о госдарственной регистрации №100160363, выдано Минским
                            горисполкомом 26.10.2023 г. Интернет-магазин включен в Торговый реестр Республики Беларусь
                            01.01.2001 за №111111
                        </p>
                        <p className="text-white text-2xl font-medium text-center">
                            funscrut .by © 2023, ООО «funscrut» УНП 000000000
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterDesktop
