'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    profession: string
    image: string
    price: string
    onClick?: () => void
}

const ProfessionCardDesktop: React.FC<IProfessionCard> = ({ image, profession, price, onClick }) => {
    return (
        <>
            <Card
                variant={'profession_home_desktop'}
                size={'profession_home_desktop'}
                style={{ backgroundImage: `url(${image})` }}
                onClick={onClick}
            >
                <CardHeader className="pl-0 pt-3">
                    <CardTitle variant={'profession_home_desktop'} size={'profession_home_desktop'}>
                        {profession}
                    </CardTitle>
                </CardHeader>
                <CardFooter variant={'profession_home_desktop'} size={'profession_home_desktop'}>
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
