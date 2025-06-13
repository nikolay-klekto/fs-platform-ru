'use client'

import React from 'react'
import Image from 'next/image'
import { contentProfessionAboutDesktop } from './contentProfessionPageDesktop/content'
import InternshipCompaniesDesktop from './components/InternshipCompanyDesktop/InternshipCompaniesDesktop'
import ReviewsDesktop from './components/ReviewsDesktop/ReviewsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import Link from 'next/link'

const ProfessionPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="container relative overflow-hidden  ">
                    <div className="flex items-center space-x-1 pb-[29px] pl-[65px] pt-[60px] text-[20px] text-gray-500">
                        <Link href="/" className="hover:underline">
                            Главная
                        </Link>
                        <span>/</span>
                        <Link href="/companies" className="hover:underline">
                            Профессии
                        </Link>
                        <span>/</span>
                        <Link href="/company" className="text-white hover:underline">
                            Программист
                        </Link>
                    </div>
                    <div className="flex flex-col px-[58px]">
                        <h1 className="mb-15 title80px_desktop font-medium uppercase text-white">Программист</h1>
                        <p className="title160px_desktop text-[160px] absolute left-0 top-0 mt-[18px] pl-[85px] font-semibold uppercase opacity-[0.02] ">
                            Программист
                        </p>
                        <div className="relative max-h-[613px] w-full">
                            <Image
                                src="/images/EpamForProfessionPage.png"
                                alt="EpamLogo"
                                className="object-contain"
                                width={1802}
                                height={613}
                            />
                        </div>
                        {contentProfessionAboutDesktop.map((item) => (
                            <div key={item.id}>
                                <p className="text32px_desktop max-w-[1803px] py-[57px] text-[rgb(135,135,151)]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                        <h2 className="mb-[63px] mt-[118px] text-[48px] uppercase">компании для стажировки:</h2>
                        <InternshipCompaniesDesktop />
                        <h2 className="mb-[81px] mt-[120px] text-[48px] uppercase  2xl:mt-[80px] 3xl:mt-[100px]">
                            отзывы о профессии
                        </h2>
                        <ReviewsDesktop />
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ProfessionPageDesktop
