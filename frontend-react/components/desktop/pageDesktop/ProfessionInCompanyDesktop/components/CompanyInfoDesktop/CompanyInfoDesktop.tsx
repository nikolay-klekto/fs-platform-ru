'use client'

import Image from 'next/image'
import BreadcrumbsDesktop from '@/components/desktop/layout/Breadcrumbs'
import { MapPinIconDesktop } from '@/components/assets/iconsDesktop'
import { content } from './contentCompanyInfoDesktop/content'

const CompanyInfoDesktop: React.FC = () => {
    return (
        <>
            <div className="container relative overflow-hidden  ">
                <div className="relative z-20 flex items-center space-x-1 pb-[29px] pl-[26px] pt-[60px] text20px_desktop text-gray-500 ">
                    <BreadcrumbsDesktop
                        items={[
                            { title: 'Главная', href: '/' },
                            {
                                title: 'Компании',
                                href: '/companies',
                            },
                            { title: 'Компания Epam', className: 'text20px_desktop hover:text-white' },
                            {
                                title: 'Программист в компании Epam',
                                className: 'text20px_desktop ',
                            },
                        ]}
                    />
                </div>

                <div className="flex flex-col px-[26px]">
                    <h1 className="title80px_desktop relative z-10 mb-[58px] font-medium uppercase">
                        {' '}
                        Программист в компании Еpam
                    </h1>
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
                            <p className="text32px_desktop font-medium max-w-[1803px] pb-[60px] pt-[55px] text-[#878797]">
                                {item.text}
                            </p>
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className="text32px_desktop flex items-start font-medium text-[#878797]">
                                        <span>Адрес офиса:</span>
                                        <div className="ml-[10px] ">
                                            <p className="text32px_desktop text-[#D1D1DD]  font-semibold xl:mb-[20px] 3xl:mb-[20px] ">
                                                {item.adress1}
                                            </p>
                                            <p className="text32px_desktop   font-semibold text-[#D1D1DD] ">
                                                {item.adress2}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text32px_desktop mt-[10px] flex items-start font-medium text-[#878797]">
                                        <span>Время работы:</span>
                                        <div className="text32px_desktop ml-[10px] text-[#D1D1DD] ">{item.time}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px] pl-[29px]">
                                    <div className="group relative w-[37px]">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress1)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MapPinIconDesktop color="#D1D1DD" />
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
                                            <MapPinIconDesktop color="#D1D1DD" />
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
                </div>
            </div>
        </>
    )
}

export default CompanyInfoDesktop
