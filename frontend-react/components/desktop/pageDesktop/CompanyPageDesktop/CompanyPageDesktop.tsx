'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPinIconDesktop } from '@/components/assets/iconsDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import InternshipProfessionsDesktop from './components/ProfessionsInCompanyDeskto/ProfessionsInCompanyDesktop'
import CompanyAdvantageDesktop from './components/CompanyAdvantageDesktop/CompanyAdvantageDesktop'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import BreadcrumbsDesktop from '../../layout/BreadcrumbsDesktop/BreadcrumbsDesktop'

const CompanyPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white ">
                <div className="container relative overflow-hidden  ">
                    <div className="relative z-20 flex items-center space-x-1 pb-[29px] pl-[65px] pt-[60px] text-[20px] text-gray-500 ">
                        <BreadcrumbsDesktop
                            items={[
                                { title: 'Главная', href: '/', className: 'hover:underline' },
                                { title: 'Компании', href: '/companies', className: 'hover:underline' },
                                { title: 'Компания EPAM', className: 'text-white hover:no-underline' },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col px-[26px]">
                        <h1 className="mb-15 title80px_desktop relative z-10 font-medium uppercase"> Компания Epam</h1>
                        <p className="title160px_desktop absolute left-0 top-0 mt-[18px] pl-[85px] font-semibold uppercase opacity-[0.02] ">
                            Компания Epam
                        </p>
                        <div className="relative max-h-[613px] w-full">
                            <Image
                                src="/images/epam-for-company-page.png"
                                alt="EpamLogo"
                                className="object-contain"
                                width={1802}
                                height={613}
                            />
                        </div>

                        {content.map((item) => (
                            <div key={item.id}>
                                <p className="text32px_desktop max-w-[1803px] py-[57px] text-[rgb(135,135,151)]">
                                    {item.text}
                                </p>
                                <div className="flex flex-row">
                                    <div className="flex flex-col">
                                        <div className="text32px_desktop flex items-start font-medium text-[#878797]">
                                            <span>Адрес офиса:</span>
                                            <div className="ml-[10px] ">
                                                <p className="text32px_desktop  3xl:mb-[20px] font-semibold text-white 2xl:mb-[20px] ">
                                                    {item.adress1}
                                                </p>
                                                <p className="text32px_desktop   font-semibold text-white">
                                                    {item.adress2}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text32px_desktop mt-[10px] flex items-start font-medium text-[#878797]">
                                            <span>Время работы:</span>
                                            <div className="text32px_desktop ml-[10px] text-white">{item.time}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px] pl-[29px]">
                                        <div className="group relative w-[37px]">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress1)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MapPinIconDesktop />
                                            </a>
                                            <div className="pointer-events-none absolute left-0 top-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-80">
                                                <div className="flex h-[73px] w-[333px] items-center justify-center whitespace-nowrap rounded-[50px] bg-[url('/background/google-map.png')] bg-cover bg-no-repeat pb-[14px] pt-[30px] text-[21px] ">
                                                    Открыть в Google карте
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group relative w-[37px]">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress2)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MapPinIconDesktop />
                                            </a>
                                            <div className="pointer-events-none absolute left-0 top-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-80">
                                                <div className="flex h-[73px] w-[333px] items-center justify-center whitespace-nowrap rounded-[50px] bg-[url('/background/google-map.png')] bg-cover bg-no-repeat pb-[14px] pt-[30px] text-[21px] ">
                                                    Открыть в Google карте
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <h2 className="mb-[63px] mt-[118px] text-[48px] font-medium uppercase ">
                            Профессии в компании
                        </h2>
                        <InternshipProfessionsDesktop />
                        {/* <h2 className="mb-[81px] mt-[120px] text-[48px] font-medium uppercase 2xl:mt-[80px] 3xl:mt-[100px]">
                            Преимущества компании
                        </h2>
                        <CompanyAdvantageDesktop /> */}
                    </div>
                </div>
                <div className="container relative mt-[120px] max-w-[1920px] overflow-hidden pl-[58px] 2xl:mt-[50px] 3xl:mt-[80px] 4xl:w-full 4xl:max-w-none 4xl:pl-[58px] 4xl:pr-0">
                    <h2 className=" text-[48px] font-medium uppercase ">Преимущества компании</h2>
                    <CompanyAdvantageDesktop />
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default CompanyPageDesktop
