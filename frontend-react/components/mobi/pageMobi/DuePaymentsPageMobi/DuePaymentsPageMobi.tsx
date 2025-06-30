'use client'

import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import { AccountNavigationMobi } from '../../layout/AccountNavigationMobi/AccountNavigationMobi'
import DuePaymentsMobi from './components/DuePaymentsMobi/DuePaymentsMobi'

const DuePaymentsPageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] pb-[40px]">
                <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                    <h1 className="title28px_mobi_custom mb-4 uppercase">Личный кабинет</h1>
                    <AccountNavigationMobi />
                    <DuePaymentsMobi />
                </div>
            </main>
            <FooterMobi />
        </>
    )
}

export default DuePaymentsPageMobi
