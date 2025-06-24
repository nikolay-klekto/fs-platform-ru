import React from 'react'
import { AccountNavigationMobi } from '../../shared/AccountNavigationMobi/AccountNavigationMobi'
import HeaderMobi from '../../layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'

const ProfilePageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] pb-[40px]">
                <div className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                    <h1 className="title28px_mobi_custom mb-4 uppercase">Личный кабинет</h1>
                    <AccountNavigationMobi />
                </div>
            </main>
            <FooterMobi />
        </>
    )
}

export default ProfilePageMobi
