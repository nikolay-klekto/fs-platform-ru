'use client'

import React from 'react'
import Image from 'next/image'
import { contentCompanyAboutDesktop } from './contentCompanyPageDesktop/content'
import { contentCompaniesDesktop } from '@/data/content' // тут будет путь к контенту с названиями компаний
import InternshipProfessionsDesktop from './components/InternshipProfessionsDesktop/InternshipProfessionsDesktop'
import ReviewsDesktop from './components/ReviewsDesktop/ReviewsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

interface ICompanyDesktop {
    company: string
    companyId: number | null
}

const CompanyDesktop: React.FC<ICompanyDesktop> = ({ company, companyId }) => {
    return (
        <>
            <HeaderDesktop />
            <div className="bg-[#101030] text-white">
                <div className="flex flex-col">
                    <div className="relative max-h-[613px] w-full px-12">
                        <Image src="/images/EpamForCompanyPage.png" alt="EpamLogo" className="object-contain" />
                    </div>
                    <h2 className="mb-15 text-[80px] font-medium uppercase text-white">КОМПАНИЯ {company}</h2>
                    {contentCompanyAboutDesktop.map((item) => (
                        <div key={item.id}>
                            <p className="mr-[clamp(56px,_4.6vw,_88px)] max-w-[1190px] text-[32px] text-[#878797]">
                                {item.text}
                            </p>
                            <p className="text-[32px] font-medium text-[#878797]">
                                {' '}
                                Адрес офиса:
                                <span className="text18px_modal_desktop ml-[10px] block text-[#878797]">
                                    {item.adress1}
                                </span>
                                <span className="text18px_modal_desktop ml-[10px] block text-white">
                                    {item.adress2}
                                </span>
                            </p>
                            <p className="text-[32px] font-medium text-[#878797]">
                                {' '}
                                Время работы:
                                <span className="text18px_modal_desktop ml-[10px] block text-white">{item.time}</span>
                            </p>
                        </div>
                    ))}

                    <h3 className="mb-[clamp(25px,_2vw,_39px)] mt-[clamp(33px,_2.7vw,_52px)] text-[48px] uppercase text-white">
                        ПРОФЕССИИ В ЭТОЙ КОМПАНИИ
                    </h3>
                    <InternshipProfessionsDesktop />
                    <h3 className="mb-[clamp(26px,_2vw,_40px)] mt-[clamp(32px,_2.6vw,_50px)] text-[48px] uppercase text-white">
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
