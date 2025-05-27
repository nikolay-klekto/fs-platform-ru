'use client'

import React from 'react'
import Image from 'next/image'
import { contentCompanyAboutDesktop } from './contentCompanyPageDesktop/content'
// import { contentCompaniesPageDesktop } from '@/components/desktop/pageDesktop/CompaniesPageDesktop/contentCompaniesPageDesktop/content'
import InternshipProfessionsDesktop from './components/InternshipProfessionsDesktop/InternshipProfessionsDesktop'
import ReviewsDesktop from './components/ReviewsDesktop/ReviewsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import Link from 'next/link'

interface ICompanyDesktop {
    company: string
}

const CompanyDesktop: React.FC<ICompanyDesktop> = ({ company }) => {
    return (
        <>
            <HeaderDesktop />
            <div className="bg-[#101030] text-white">
                <div className="flex items-center space-x-1 pb-[29px] pl-[65px] pt-[60px] text-[20px] text-gray-500">
                    <Link href="/" className="hover:underline">
                        Главная
                    </Link>
                    <span>/</span>
                    <Link href="/companies" className="hover:underline">
                        Компании
                    </Link>
                    <span>/</span>
                    <Link href="/company" className="hover:underline">
                        Компания Еpam
                    </Link>
                </div>

                <div className="flex flex-col px-[58px]">
                    <h2 className="mb-15 title80px_desktop font-medium uppercase text-white">КОМПАНИЯ EPAM </h2>
                    <div className="relative max-h-[613px] w-full">
                        <Image
                            src="/images/EpamForCompanyPage.png"
                            alt="EpamLogo"
                            className="object-contain"
                            width={1802}
                            height={613}
                        />
                    </div>

                    {contentCompanyAboutDesktop.map((item) => (
                        <div key={item.id}>
                            <p className="text32px_desktop max-w-[1803px] py-[57px] text-[rgb(135,135,151)]">
                                {item.text}
                            </p>
                            <div className="flex flex-row">
                                <div>
                                    <div className="text32px_desktop flex items-start font-medium text-[#878797]">
                                        <span>Адрес офиса:</span>
                                        <div className="ml-[10px]">
                                            <p className="text32px_desktop text-white">{item.adress1}</p>
                                            <p className="text32px_desktop text-white">{item.adress2}</p>
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex items-start text32px_desktop font-medium text-[#878797]">
                                        <span>Время работы:</span>
                                        <div className="ml-[10px] text32px_desktop text-white">{item.time}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px] pl-[29px]">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress1)}`}
                                        title="Открыть в Google"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-fit"
                                    >
                                        <img
                                            src="/images/map-pin.png"
                                            alt="map-pin"
                                            className="size-[37px] cursor-pointer"
                                        />
                                        <div className="absolute z-10 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-80">
                                            <div className="flex h-[73px] w-[333px] items-center justify-center whitespace-nowrap rounded-[50px] bg-[url('/background/GoogleMap.png')] bg-cover bg-no-repeat pb-[14px] pt-[30px] text-[21px] text-white">
                                                Открыть в Google карте
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress2)}`}
                                        title="Открыть в Google"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-fit"
                                    >
                                        <img
                                            src="/images/map-pin.png"
                                            alt="map-pin"
                                            className="size-[37px] cursor-pointer"
                                        />
                                        <div className="absolute z-10 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-80">
                                            <div className="flex h-[73px] w-[333px] items-center justify-center whitespace-nowrap rounded-[50px] bg-[url('/background/GoogleMap.png')] bg-cover bg-no-repeat pb-[14px] pt-[30px] text-[21px] text-white">
                                                Открыть в Google карте
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                    <h3 className="mb-[63px] mt-[118px] text-[48px] uppercase text-white">ПРОФЕССИИ В ЭТОЙ КОМПАНИИ</h3>
                    <InternshipProfessionsDesktop />
                    <h3 className="mb-[81px] mt-[175px] 3xl:mt-[115px] 2xl:mt-[80px] text-[48px] uppercase text-white">
                        ПРЕИМУЩЕСТВА КОМПАНИИ
                    </h3>
                    <ReviewsDesktop />
                </div>
            </div>
            <FooterDesktop />
        </>
    )
}

export default CompanyDesktop
