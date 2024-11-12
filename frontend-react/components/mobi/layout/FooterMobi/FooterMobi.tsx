'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { contentFooterMobi } from './contentFooterMobi'
import { LogoIconMobi, TelegramIconMobi, InstagramIconMobi, VkIconMobi } from '@/components/assets/iconsMobi'

const FooterMobi: React.FC = () => {
    return (
        <>
            <footer
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.5), rgba(16,16,48,0.5)), url(/background/bgFooterMobi.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container flex flex-col items-center pt-6 pb-12">
                    <LogoIconMobi />
                    <div className="flex justify-between w-full pt-7">
                        {contentFooterMobi.map((section) => (
                            <div className="pr-1" key={section.id}>
                                <p className="text-white text-4xl font-semibold pb-4 sm_xl:text-3xl sm_l:text-3xl sm_s:text-2xl sm:text-2xl">
                                    {section.title}
                                </p>
                                <ul>
                                    {section.links.map((link, linkIndex) => (
                                        <li
                                            key={linkIndex}
                                            className={` text-white font-medium text-xl sm_xl:text-base sm_l:text-base sm_s:text-sm sm:text-sm ${linkIndex !== section.links.length - 1 ? 'pb-4' : ''}`}
                                        >
                                            {link.href.startsWith('tel:') || link.href.startsWith('mailto:') ? (
                                                <a href={link.href} className="whitespace-nowrap">
                                                    {link.name}
                                                </a>
                                            ) : (
                                                <Link href={link.href}>{link.name}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between max-w-[112px] w-full py-10">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <TelegramIconMobi />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <InstagramIconMobi />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <VkIconMobi />
                        </a>
                    </div>
                    <div className="w-full h-[2px] bg-[#878797] rounded-full"></div>
                    <div className="flex justify-between items-center pt-10 gap-x-12 gap-y-3 flex-wrap w-full sm_l:justify-start sm_s:justify-start sm:justify-start sm_xl:gap-x-8 sm_l:gap-x-8 sm_s:gap-x-12 sm:gap-x-12">
                        <Image src="/images/iconFooter_1.png" alt="icon" width={63} height={21} />
                        <Image src="/images/iconFooter_2.png" alt="icon" width={30} height={30} />
                        <Image src="/images/iconFooter_3.png" alt="icon" width={145} height={30} />
                        <Image src="/images/iconFooter_4.png" alt="icon" width={42} height={28} />
                        <Image src="/images/iconFooter_6.png" alt="icon" width={41} height={46} />
                        <Image src="/images/iconFooter_7.png" alt="icon" width={57} height={24} />
                        <Image src="/images/iconFooter_8.png" alt="icon" width={50} height={20} />
                        <Image src="/images/iconFooter_9.png" alt="icon" width={62} height={30} />
                        <Image src="/images/iconFooter_10.png" alt="icon" width={106} height={21} />
                        <Image src="/images/iconFooter_5.png" alt="icon" width={78} height={30} />
                    </div>
                    <p className="max-w-[896px] custom-grey text-xs font-medium text-center pt-6 pb-4">
                        ООО “Надежные программы” УНП 100160363. 220006, Республика Беларусь, г. Минск, ул. Аранская 8,
                        блок 1, эт. 4 Свидетельство о госдарственной регистрации №100160363, выдано Минским
                        горисполкомом 26.10.2023 г. Интернет-магазин включен в Торговый реестр Республики Беларусь
                        01.01.2001 за №111111
                    </p>
                    <p className="text-white text-xs font-medium text-center">
                        funscrut .by © 2023, ООО «funscrut» УНП 000000000
                    </p>
                </div>
            </footer>
        </>
    )
}
export default FooterMobi
