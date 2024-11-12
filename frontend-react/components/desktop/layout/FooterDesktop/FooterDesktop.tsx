'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { contentFooterDesktop } from './contentFooterDesktop'
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
                    <div className="absolute">
                        <LogoIconDesktop className="w-[71px] h-[59px]" />
                    </div>
                    <div className="flex justify-center pl-24 pr-24 pb-10">
                        <div className="flex justify-between w-full max-w-[1190px]">
                            {contentFooterDesktop.map((section) => (
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
                    <div className="flex flex-col items-center justify-between h-[162px] mt-12 pl-24 pr-24">
                        <div className="flex justify-between items-center w-full max-w-[1190px]">
                            <Image src="/images/iconFooter_1.png" alt="icon" width={63} height={21} />
                            <Image src="/images/iconFooter_2.png" alt="icon" width={30} height={30} />
                            <Image src="/images/iconFooter_3.png" alt="icon" width={145} height={30} />
                            <Image src="/images/iconFooter_4.png" alt="icon" width={42} height={28} />
                            <Image src="/images/iconFooter_5.png" alt="icon" width={78} height={30} />
                            <Image src="/images/iconFooter_6.png" alt="icon" width={41} height={46} />
                            <Image src="/images/iconFooter_7.png" alt="icon" width={57} height={24} />
                            <Image src="/images/iconFooter_8.png" alt="icon" width={50} height={20} />
                            <Image src="/images/iconFooter_9.png" alt="icon" width={62} height={30} />
                            <Image src="/images/iconFooter_10.png" alt="icon" width={106} height={21} />
                        </div>
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
