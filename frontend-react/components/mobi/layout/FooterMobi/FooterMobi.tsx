'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { contentFooterMobi, contentFooterMobiImages } from './contentFooterMobi'
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
                            <div className="pr-2" key={section.id}>
                                <p className="text-white text-4xl font-semibold pb-4 sm_xl:text-3xl sm_l:text-3xl sm_s:text-2xl sm:text-2xl">
                                    {section.title}
                                </p>
                                <ul>
                                    {section.links.map((link) => (
                                        <li
                                            key={link.id}
                                            className={` text-white font-medium text-xl sm_xl:text-base sm_l:text-base sm_s:text-sm sm:text-sm ${link.id !== section.links.length ? 'pb-4' : ''}`}
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
                    <div className="w-full h-[2px] bg-custom-grey rounded-full"></div>
                    <div className="flex items-center pt-10 gap-x-8 gap-y-4 flex-wrap">
                        {contentFooterMobiImages.map((image) => (
                            <Image
                                key={image.id}
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                            />
                        ))}
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

/*
<div className="flex justify-between items-center pt-10 gap-x-12 gap-y-3 flex-wrap w-full sm_l:justify-start sm_s:justify-start sm:justify-start sm_xl:gap-x-8 sm_l:gap-x-8 sm_s:gap-x-12 sm:gap-x-12">
    {contentFooterMobiImages.map((image) => (
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
    ))}
</div>
*/
