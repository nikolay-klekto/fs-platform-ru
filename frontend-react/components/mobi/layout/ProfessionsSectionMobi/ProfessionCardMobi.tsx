'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardMobiProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardMobi: React.FC<ProfessionCardMobiProps> = ({ image, profession, price }) => {
    return (
        <Card
            className="sm_xl:w-[320px] sm_l:w-[300px] sm_s:w-[280px] flex aspect-[5/6] w-[320px] shrink-0 grow-0 flex-col justify-between rounded-[38px] border-none bg-cover bg-center p-[20px] sm:w-[260px]"
            style={{ backgroundImage: `url(${image})` }}
        >
            <CardHeader className="p-0">
                <CardTitle className="text22px_mobi w-fit rounded-[38px] bg-white bg-opacity-[70%] px-[15px] py-[10px] font-semibold tracking-normal text-[#101030]">
                    {profession}
                </CardTitle>
            </CardHeader>
            <CardFooter className="p-0">
                <p className="text18px_mobi w-fit rounded-[38px] bg-white bg-opacity-[100%] px-[15px] py-[5px] font-medium text-[#878797]">
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
