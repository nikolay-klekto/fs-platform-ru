'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardMobiProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardPageMobi: React.FC<ProfessionCardMobiProps> = ({ image, profession, price }) => {
    return (
        <>
            <Card
                variant={'profession_page_mobi'}
                size={'profession_page_mobi'}
                rounded={'rounded_24px'}
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardTitle variant={'profession_page_mobi'} size={'profession_page_mobi'} rounded={'rounded_12px'}>
                    {profession}
                </CardTitle>
                <CardFooter variant={'profession_page_mobi'} size={'profession_page_mobi'} rounded={'rounded_12px'}>
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
