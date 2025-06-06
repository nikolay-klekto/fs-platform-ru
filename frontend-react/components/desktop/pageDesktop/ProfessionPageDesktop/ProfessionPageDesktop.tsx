'use client'

import React from 'react'
import Image from 'next/image'
import { contentProfessionAboutDesktop } from './contentProfessionPageDesktop/content'
import InternshipCompaniesDesktop from './components/InternshipCompanyDesktop/InternshipCompaniesDesktop'
import ReviewsDesktop from './components/ReviewsDesktop/ReviewsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import Link from 'next/link'

interface IProfessionDesktop {
    profession: string
}

const ProfessionPageDesktop: React.FC<IProfessionDesktop> = ({ profession }) => {
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
                        Профессии
                    </Link>
                    <span>/</span>
                    <Link href="/company" className="text-white hover:underline">
                        Программист
                    </Link>
                </div>
                <div className="flex flex-col px-[58px]">
                    <h2 className="mb-15 title80px_desktop font-medium uppercase text-white">ПРОГРАММИСТ</h2>
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
                    <h3 className="mb-[63px] mt-[118px] text-[48px] uppercase text-white">компании для стажировки:</h3>
                    <InternshipCompaniesDesktop />
                    <h3 className="mb-[81px] mt-[120px] text-[48px] uppercase text-white 2xl:mt-[80px] 3xl:mt-[100px]">
                        отзывы о профессии
                    </h3>
                    <ReviewsDesktop />
                </div>
            </div>
            <FooterDesktop />
        </>
    )
}

{
    /* <Modal onClose={onClose} size="large-l" showCloseButton={false} className="px-[clamp(180px,_14vw,_277px)]">
            <div className="modal-padding-content-lg-dsk flex flex-col">
                <button onClick={onClose} className="absolute right-[36px] top-[23px]">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="text46px_desktop text-gradient_desktop_custom mb-[5px] font-medium uppercase">
                    {profession}
                </h2>
                {contentProfessionAboutDesktop.map((item) => (
                    <p
                        key={item.id}
                        className="text18px_modal_desktop mr-[clamp(56px,_4.6vw,_88px)] max-w-[1190px] text-[#878797]"
                    >
                        {item.text}
                    </p>
                ))}
                <h3 className="text28px_modal_desktop mb-[clamp(25px,_2vw,_39px)] mt-[clamp(33px,_2.7vw,_52px)] uppercase">
                    компании для стажировки:
                </h3>
                <InternshipCompaniesDesktop />
                <h3 className="text28px_modal_desktop mb-[clamp(26px,_2vw,_40px)] mt-[clamp(32px,_2.6vw,_50px)] uppercase">
                    отзывы о профессии
                </h3>
                <ReviewsDesktop />
            </div>
        </Modal>
    )
} */
}

export default ProfessionPageDesktop
