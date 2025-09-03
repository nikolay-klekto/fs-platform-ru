'use client'

import * as React from 'react'
import { useRef } from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ProfessionCardMobi from './ItemsProfessionSection/ProfessionCardMobi'
import ProfessionSendMobi from './ItemsProfessionSection/ProfessionSendMobi'
import { content } from './contentProfessionsSectionMobi/content'
import { useModal } from '@/context/ContextModal'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const ProfessionsSectionMobi: React.FC = () => {
    const { openModal } = useModal()
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)
    return (
        <section className="mt-[42px] flex max-w-full flex-col gap-[20px] px-[15px] pt-[20px] sm:gap-[15px] sm:pt-[15px] md:mt-[82px]">
            <TitleMobi title={'Профессии'} href={'/professions'} />
            <div className="flex items-center justify-between">
                <p className="sm_xl:text-4xl sm_l:text-3xl sm_s:text-3xl text-[20px] font-semibold text-[#878797] sm:text-3xl md:text-[clamp(20px,5vw,34px)]">
                    Наиболее популярные на нашем сервисе
                </p>
            </div>
            <div
                ref={contentRef}
                className="no-scrollbar_custom mx-auto mb-[20px] flex w-full gap-[20px] overflow-y-hidden overflow-x-scroll py-[32px]"
            >
                {content.slice(0, 4).map((item) => (
                    <ProfessionCardMobi
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price ? item.price.toString() : null}
                        onClick={() => {
                            openModal('profession_modal_mobi', 'mobi', {
                                profession: item.profession,
                                professionId: item.id,
                            })
                        }}
                    />
                ))}
            </div>
            <div ref={scrollbarRef} className="scrollbar_custom relative h-2 overflow-x-scroll">
                <div className="h-full" style={{ width: `${scrollContentWidth}px` }}></div>
            </div>
            <ProfessionSendMobi />
        </section>
    )
}

export default ProfessionsSectionMobi
