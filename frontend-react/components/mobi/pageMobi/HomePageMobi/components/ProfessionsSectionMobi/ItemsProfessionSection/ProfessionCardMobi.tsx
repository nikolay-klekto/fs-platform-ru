'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    profession: string
    image: string
    price: string | null
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
                <p className="text-4xl text-[#878797] sm:text-2xl md:text-[clamp(13px,6vw,33px)]">
                    от{' '}
                    <span className="bg-gradient-desktop bg-clip-text p-0.5 text-[27px] font-medium text-transparent sm:text-5xl md:text-[clamp(30px,7vw,50px)]">
                        {price ? price : 'XX'} BYN/
                    </span>
                    неделя
                </p>
            </CardFooter>
        </Card>
    )
}

export default ProfessionCardMobi
