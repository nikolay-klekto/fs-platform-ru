'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    profession: string
    image: string
    price: string
    onClick: () => void
}

const ProfessionCardPageMobi: React.FC<IProfessionCard> = ({ image, profession, price, onClick }) => {
    return (
        <>
            <Card
                variant={'profession_page_mobi'}
                size={'profession_page_mobi'}
                rounded={'rounded_24'}
                style={{ backgroundImage: `url(${image})` }}
                onClick={onClick}
            >
                <CardTitle variant={'profession_page_mobi'} size={'profession_page_mobi'} rounded={'rounded_12'}>
                    {profession}
                </CardTitle>
                <CardFooter variant={'profession_page_mobi'} size={'profession_page_mobi'} rounded={'rounded_12'}>
                    <p className="text-base text-[#878797]">
                        от{' '}
                        <span className="w-fit bg-gradient-mobi bg-clip-text  text-xl text-transparent">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ProfessionCardPageMobi
