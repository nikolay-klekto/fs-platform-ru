import React from 'react'
import JoinTeamMobi from './components/JoinTeamMobi'
import HeaderMobi from '../../layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'

const JoinTeamPageMobi: React.FC = () => {
    return (
        <>
            <HeaderMobi />
            <main className="flex flex-col bg-[#101030] text-white">
                <JoinTeamMobi />
            </main>
            <FooterMobi />
        </>
    )
}

export default JoinTeamPageMobi
