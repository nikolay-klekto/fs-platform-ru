'use client'

import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'

const DuePaymentsPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="min-h-[60vh] grow bg-[#101030]">
                <div className="relative overflow-hidden">
                    <div className="radial-gradient_desktop left-[-369px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[50px] top-[933px]"></div>
                    <div className="container">
                        <div className="relative z-10 flex items-center pt-10">
                            <h1 className="text46px_desktop pr-[100px] font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h1>
                        </div>
                    </div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default DuePaymentsPageDesktop
