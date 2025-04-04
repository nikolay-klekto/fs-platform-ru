'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogoIconDesktop } from '@/components/assets/iconsDesktop'
import { contentFooterDesktop, contentFooterImagesDesktop } from './content'

const FooterDesktop: React.FC = () => {
    return (
        <>
            <footer
                className="flex h-[521px] items-center justify-center"
                style={{
                    backgroundColor: 'rgb(16,16,48)',
                    backgroundImage: `linear-gradient(rgba(16,16,48,0.5), rgba(16,16,48,0.5)), url(/background/bgFooterDesktop.png)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container relative mx-4 h-[521px] rounded-t-[3.125rem] bg-[#10103033] p-6">
                    <div className="absolute pt-3 2xl:hidden">
                        <LogoIconDesktop className="h-[59px] w-[71px]" />
                    </div>
                    <div className="flex justify-center px-24 pb-5 pt-3 2xl:px-0">
                        <div className="flex w-full max-w-[1190px] justify-around">
                            {contentFooterDesktop.map((section) => (
                                <div key={section.id}>
                                    <p className="pb-7 text-4xl font-bold text-white">{section.title}</p>
                                    <ul>
                                        {section.links.map((link) => (
                                            <li
                                                key={link.id}
                                                className={`text-2xl font-medium text-white ${link.id !== section.links.length ? 'pb-5' : ''} `}
                                            >
                                                <Link href={link.href}>{link.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {section.icons && (
                                        <div className="flex max-w-[112px] justify-between pt-5">
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
                    <div className="bg-custom-grey h-[2px] w-full rounded-full"></div>
                    <div className="mt-8 flex h-[162px] flex-col items-center justify-between px-24 2xl:px-0">
                        <div className="flex w-full max-w-[1190px] items-center justify-center gap-10">
                            {contentFooterImagesDesktop.map((image) => (
                                <Image
                                    key={image.id}
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                />
                            ))}
                        </div>
                        <p className="custom-grey max-w-[896px] pb-4 pt-7 text-center text-2xl font-medium">
                            ООО “Надежные программы” УНП 100160363. 220006, Республика Беларусь, г. Минск, ул. Аранская
                            8, блок 1, эт. 4 Свидетельство о госдарственной регистрации №100160363, выдано Минским
                            горисполкомом 26.10.2023 г. Интернет-магазин включен в Торговый реестр Республики Беларусь
                            01.01.2001 за №111111
                        </p>
                        <p className="mt-3 text-center text-2xl font-medium text-white">
                            funscrut .by © 2023, ООО «funscrut» УНП 000000000
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterDesktop
