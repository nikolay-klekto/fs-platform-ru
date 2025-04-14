'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    profession: string
    image: string
    price: string
    onClick?: () => void
}

const ProfessionCardMobi: React.FC<IProfessionCard> = ({ image, profession, price, onClick }) => {
    return (
        <Card
            variant={'profession_home_mobi'}
            size={'profession_home_mobi'}
            rounded={'rounded_38'}
            style={{ backgroundImage: `url(${image})` }}
            onClick={onClick}
        >
            <CardHeader className="p-0">
                <CardTitle variant={'profession_home_mobi'} size={'profession_home_mobi'} rounded={'rounded_38'}>
                    {profession}
                </CardTitle>
            </CardHeader>
            <CardFooter variant={'profession_home_mobi'} size={'profession_home_mobi'} rounded={'rounded_38'}>
                <p className="text18px_mobi text-[#878797]">
                    от{' '}
                    <span className="bg-gradient-desktop sm_xl:text-6xl sm_l:text-5xl sm_s:text-5xl bg-clip-text text-[27px] font-medium text-transparent sm:text-5xl md:text-8xl">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </CardFooter>
        </Card>
    )
}

export default ProfessionCardMobi
