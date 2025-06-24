'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { contentProfessionAboutDesktop } from './contentProfessionPageDesktop/content'
import InternshipCompaniesDesktop from './components/InternshipCompanyDesktop/InternshipCompaniesDesktop'
import ProfessionReviewsDesktop from './components/ProfessionReviewsDesktop/ProfessionReviewsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

const ProfessionPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="container relative overflow-hidden  ">
                    <div className="relative z-10 flex items-center space-x-1 pb-[29px] pl-[65px] pt-[60px] text-[20px] text-gray-500">
                        <Link href="/" className="hover:underline">
                            Главная
                        </Link>
                        <span>/</span>
                        <Link href="/professions" className="hover:underline">
                            Профессии
                        </Link>
                        <span>/</span>
                        <Link href="/profession" className="text-white hover:underline">
                            Программист
                        </Link>
                    </div>
                    <div className="flex flex-col px-[58px]">
                        <h1 className="mb-15 title80px_desktop font-medium uppercase text-white">Программист</h1>
                        <p className="title160px_desktop absolute left-0 top-0 pl-[114px] pr-[146px] font-semibold uppercase opacity-[0.02] 2xl:mt-[25px] 3xl:mt-[18px] 4xl:mt-[8px]">
                            Программист
                        </p>
                        <div className="relative max-h-[613px] w-full">
                            <Image
                                src="/images/epam-for-profession-page.png"
                                alt="EpamLogo"
                                className="object-contain"
                                width={1802}
                                height={613}
                            />
                        </div>
                        {contentProfessionAboutDesktop.map((item) => (
                            <div key={item.id}>
                                <p className="text36px_desktop text-medium max-w-[1803px] py-[57px] text-[rgb(135,135,151)]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                        <h2 className="mb-[63px] mt-[96px] text-[48px] font-medium uppercase">
                            Компании для стажировки:
                        </h2>
                        <InternshipCompaniesDesktop />
                        <h2 className="mb-[81px] text-[48px] font-medium uppercase ">Отзывы о профессии</h2>
                        <ProfessionReviewsDesktop />
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ProfessionPageDesktop
