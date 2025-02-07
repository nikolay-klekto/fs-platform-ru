'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardDesktopProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardPageDesktop: React.FC<ProfessionCardDesktopProps> = ({ image, profession, price }) => {
    return (
        <>
            <Card
                variant={'profession_page_desktop'}
                size={'profession_page_desktop'}
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardTitle variant={'profession_page_desktop'} size={'profession_page_desktop'} rounded={'rounded_25'}>
                    {profession}
                </CardTitle>
                <CardFooter variant={'profession_page_desktop'} size={'profession_page_desktop'} rounded={'rounded_25'}>
                    <p className="4xl:text-4xl 3xl:text-4xl  text-7xl leading-[40px] tracking-normal text-[#878797]  2xl:text-3xl">
                        от{' '}
                        <span className="bg-gradient-desktop 4xl:text-6xl 3xl:text-5xl bg-clip-text text-8xl text-transparent 2xl:text-4xl">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ProfessionCardPageDesktop
