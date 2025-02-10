'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardMobiProps {
    profession: string
    image: string
    price: string
    onClick: () => void
}

const ProfessionCardPageMobi: React.FC<ProfessionCardMobiProps> = ({ image, profession, price, onClick }) => {
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
                    <p className="bg-gradient-mobi w-fit bg-clip-text  text-xl text-transparent">
                        {price} BYN/
                        <span className="text-base text-[#878797]">неделя</span>
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ProfessionCardPageMobi
