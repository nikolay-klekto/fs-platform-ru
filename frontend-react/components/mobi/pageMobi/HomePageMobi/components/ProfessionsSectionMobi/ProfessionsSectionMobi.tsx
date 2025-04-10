'use client'

import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ProfessionCardMobi from './ItemsProfessionSection/ProfessionCardMobi'
import ProfessionSendMobi from './ItemsProfessionSection/ProfessionSendMobi'
import { content } from './contentProfessionsSectionMobi/content'
import { useModal } from '@/context/ContextModal'

const ProfessionsSectionMobi: React.FC = () => {
    const { openModal } = useModal()

    return (
        <div className="flex max-w-full flex-col gap-[20px] px-[15px] py-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title={'Профессии'} href={'/professions'} />
            <div className="flex items-center justify-between">
                <p className="sm_xl:text-4xl sm_l:text-3xl sm_s:text-3xl text-[20px] font-semibold text-[#878797] sm:text-3xl md:text-5xl">
                    Наиболее популярные на нашем сервисе
                </p>
            </div>
            <div className="scrollbar_custom mx-auto mb-[20px] flex w-full gap-[20px] overflow-y-hidden overflow-x-scroll py-[20px]">
                {content.slice(0, 4).map((item) => (
                    <ProfessionCardMobi
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price.toString()}
                        onClick={() => {
                            openModal('profession_modal_mobi', 'mobi', {
                                profession: item.profession,
                                professionId: item.id,
                            })
                        }}
                    />
                ))}
            </div>
            <ProfessionSendMobi />
        </div>
    )
}

export default ProfessionsSectionMobi
