'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    profession: string
    image: string
    price: string
}

const ProfessionCard: React.FC<IProfessionCard> = ({ image, profession, price }) => {
    const imagePath = `/images/${image}` //Добавила путь к карточкам

    return (
        <Card
            variant={'profession_page_desktop'}
            size={'profession_page_desktop'}
            style={{ backgroundImage: `url(${imagePath})` }}
        >
            <CardTitle variant={'profession_page_desktop'} size={'profession_page_desktop'} rounded={'rounded_25'}>
                {profession}
            </CardTitle>
            <CardFooter variant={'profession_page_desktop'} size={'profession_page_desktop'} rounded={'rounded_25'}>
                <p className="text-7xl leading-[40px] tracking-normal text-[#878797] 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                    от{' '}
                    <span className="bg-gradient-desktop bg-clip-text text-8xl text-transparent 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </CardFooter>
        </Card>
    )
}

export default ProfessionCard
