'use client'

import React from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ProfessionCardDesktop from '@/components/desktop/layout/ProfessionsSectionDesktop/ProfessionCardDesktop'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { content } from '@/components/desktop/layout/ProfessionsSectionDesktop/content'
import { useModal } from '@/context/ContextModal'

interface IProfessionsSection {
    cardsToShow?: number
}

const ProfessionsSectionDesktop: React.FC<IProfessionsSection> = ({ cardsToShow = 4 }) => {
    const { openModal } = useModal()

    return (
        <div className="container flex flex-col gap-[80px] py-[100px]">
            <div className="mb-35xl">
                <TitleDesktop title={'Профессии'} href={'/professions'} />
            </div>
            <div className="flex items-center justify-between">
                <p className="text36px_desktop font-medium uppercase text-white ">Наиболее популярные профессии</p>
                <Link href={'/professions'}>
                    <Button variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                        Смотреть все
                    </Button>
                </Link>
            </div>
            <div className="w-fill grid grid-cols-4 gap-[clamp(28px,_5vw,_35px)]">
                {content.slice(0, cardsToShow).map((item) => (
                    <ProfessionCardDesktop
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price.toString()}
                        onClick={() => {
                            openModal('profession_modal_desktop', 'desktop', {
                                profession: item.profession,
                                professionId: item.id,
                            })
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
export default ProfessionsSectionDesktop
