'use client'

import React from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ProfessionCardDesktop from '@/components/desktop/layout/ProfessionsSectionDesktop/ProfessionCardDesktop'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProfessionSearchField from './ProfessionSearchFieldDesktop'
import { content } from '@/components/desktop/layout/ProfessionsSectionDesktop/content'

interface ProfessionsSectionDesktopProps {
    cardsToShow?: number
}

const ProfessionsSectionDesktop: React.FC<ProfessionsSectionDesktopProps> = ({ cardsToShow = 4 }) => {
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
            <div className="w-fill 3xl:gap-[28px] 4xl:h-[450px] 3xl:h-[420px] grid h-[520px] grid-cols-4 gap-[32px] 2xl:h-[370px] ">
                {content.slice(0, cardsToShow).map((item) => (
                    <ProfessionCardDesktop
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price.toString()}
                    />
                ))}
            </div>
            <ProfessionSearchField />
        </div>
    )
}
export default ProfessionsSectionDesktop
