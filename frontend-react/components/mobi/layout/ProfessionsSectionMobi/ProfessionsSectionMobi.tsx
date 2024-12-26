'use client'

import React, { useState, useRef, useEffect } from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ProfessionCardMobi from './ProfessionCardMobi'
import ProfessionSendMobi from './ProfessionSendMobi'
import { content } from '@/components/desktop/layout/ProfessionsSectionDesktop/content'
import ProfessionModalMobi from '../ProfessionModalMobi/ProfessionModalMobi'

const ProfessionsSectionMobi: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedProfession, setSelectedProfession] = useState<string>('')
    const [selectedIdProfession, setSelectedIdProfession] = useState<number | null>(null)
    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div className="sm_l:gap-[20px] sm_s:gap-[20px] flex max-w-full flex-col gap-[30px] px-[15px] py-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title={'Профессии'} href={'/professions'} />
            <div className="flex items-center justify-between">
                <p className="sm_xl:text-4xl sm_l:text-3xl sm_s:text-3xl mb-[20px] text-[20px] font-semibold text-[#878797] sm:text-3xl md:text-5xl">
                    Наиболее популярные на нашем сервисе
                </p>
            </div>
            <div className="scrollbar_custom mx-auto flex w-full gap-[20px] overflow-y-hidden overflow-x-scroll py-[20px]">
                {content.slice(0, 4).map((item) => (
                    <ProfessionCardMobi
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price.toString()}
                        onClick={() => {
                            setSelectedProfession(item.profession)
                            setSelectedIdProfession(item.id)
                            setOpenModal(true)
                        }}
                    />
                ))}
            </div>

            <ProfessionSendMobi />
            {openModal && (
                <ProfessionModalMobi
                    closeModal={closeModal}
                    profession={selectedProfession}
                    professionId={selectedIdProfession}
                />
            )}
        </div>
    )
}

export default ProfessionsSectionMobi
