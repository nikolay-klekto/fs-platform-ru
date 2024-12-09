'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardDesktopProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardDesktop: React.FC<ProfessionCardDesktopProps> = ({ image, profession, price }) => {
    return (
        <>
            <Card
                variant={'profession_home_desktop'}
                size={'profession_home_desktop'}
                rounded={'rounded_50'}
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardHeader className="pl-0 pt-3">
                    <CardTitle
                        variant={'profession_home_desktop'}
                        size={'profession_home_desktop'}
                        rounded={'rounded_50'}
                    >
                        {profession}
                    </CardTitle>
                </CardHeader>
                <CardFooter variant={'profession_home_desktop'} size={'profession_home_desktop'} rounded={'rounded_50'}>
                    <p className=" text24px_desktop  text-[#878797] ">
                        от{' '}
                        <span className="bg-gradient-desktop text36px_desktop bg-clip-text text-transparent">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ProfessionCardDesktop
