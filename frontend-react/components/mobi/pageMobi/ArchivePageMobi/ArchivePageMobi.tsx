'use client'

import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

const ArchivePageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <main className="min-h-screen grow bg-[#101030]">
                <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                    <h1 className="title28px_mobi_custom mb-4">ЛИЧНЫЙ КАБИНЕТ</h1>
                </div>
            </main>
            <FooterMobi />
        </>
    )
}

export default ArchivePageMobi
