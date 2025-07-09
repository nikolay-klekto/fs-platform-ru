'use client'

import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { AccountNavigationDesktop } from '@/components/desktop/layout/AccountNavigationDesktop/AccountNavigationDesktop'
import DuePaymentsDesktop from './components/DuePaymentsDesktop/DuePaymentsDesktop'

const DuePaymentsPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className=" bg-[#101030] text-white">
                <div className="container relative overflow-hidden">
                    <div className="radial-gradient_desktop left-[150px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                    <div className=" relative">
                        <div className="flex items-center justify-between py-20">
                            <h1 className="title46px_desktop whitespace-nowrap pr-16 font-medium uppercase leading-[70%] tracking-normal">
                                Личный кабинет
                            </h1>
                            <AccountNavigationDesktop />
                        </div>
                        <DuePaymentsDesktop />
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default DuePaymentsPageDesktop
