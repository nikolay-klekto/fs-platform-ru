'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogoIconMobi, TelegramIconMobi, InstagramIconMobi, LinkedInIconMobi } from '@/components/assets/iconsMobi'
import {
    contentFooterMobi,
    contentFooterMobiImages,
} from '@/components/mobi/layout/FooterMobi/contentFooterMobi/content'

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
                <div className="container flex flex-col items-center px-3 pb-12 pt-6">
                    <LogoIconMobi />
                    <div className="flex w-full justify-between pt-7">
                        {contentFooterMobi.map((section) => (
                            <div className="pr-2" key={section.id}>
                                <p className="sm_xl:text-3xl sm_l:text-3xl sm_s:text-2xl pb-4 text-4xl font-semibold text-white sm:text-2xl md:text-[clamp(20px,4vw,32px)]">
                                    {section.title}
                                </p>
                                <ul>
                                    {section.links.map((link) => (
                                        <li
                                            key={link.id}
                                            className={` sm_xl:text-base sm_l:text-base sm_s:text-sm text-xl font-medium text-white opacity-50 sm:text-sm md:text-[clamp(18px,3vw,24px)] ${link.id !== section.links.length ? 'pb-4' : ''}`}
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
                    <div className="flex w-full max-w-[112px] justify-between py-10 md:max-w-[226px]">
                        <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                            <TelegramIconMobi />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <InstagramIconMobi />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <LinkedInIconMobi />
                        </a>
                    </div>
                    <div className="bg-custom-grey h-[2px] w-full rounded-full"></div>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-10">
                        {contentFooterMobiImages.map((image) => (
                            <div key={image.id} className="size-fit">
                                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
                            </div>
                        ))}
                    </div>
                    <p className="custom-grey max-w-[896px] pb-4 pt-6 text-center text-xs font-medium md:max-w-[694px] md:text-5xl">
                        ООО “Надежные программы” УНП 100160363. 220006, Республика Беларусь, г. Минск, ул. Аранская 8,
                        блок 1, эт. 4 Свидетельство о госдарственной регистрации №100160363, выдано Минским
                        горисполкомом 26.10.2023 г. Интернет-магазин включен в Торговый реестр Республики Беларусь
                        01.01.2001 за №111111
                    </p>
                    <p className="text-center text-xs font-medium text-white md:max-w-[694px] md:text-5xl">
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
