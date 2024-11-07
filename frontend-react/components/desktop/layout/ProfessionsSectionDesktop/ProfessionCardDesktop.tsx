'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardProps {
    profession: string
    image: string
    price: string
}

///
const ProfessionCardDesktop: React.FC<ProfessionCardProps> = ({ image, profession, price }) => {
    return (
        <>
            <Card
                className="3xl:px-[20px] hover:shadow_desktop_custom flex cursor-pointer flex-col justify-between rounded-[50px] border-none bg-cover bg-center px-[30px] py-[20px] 2xl:px-[15px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardHeader className="pl-0 pt-3">
                    <CardTitle className=" text-10xl 3xl:text-8xl 3xl:px-[20px] ellipsis rounded-[50px] bg-white bg-opacity-[70%] px-[30px] py-[4px] font-semibold tracking-normal text-[#101030] 2xl:px-[15px] 2xl:text-6xl">
                        {profession}
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <p className="3xl:text-[22px] w-fit rounded-[50px] bg-white bg-opacity-[100] px-[15px] py-[5px] text-[24px] font-medium text-[#878797] 2xl:px-[10px] 2xl:text-[20px]">
                        от{' '}
                        <span className="bg-gradient-desktop 3xl:text-[33px] bg-clip-text text-[36px] font-medium text-transparent 2xl:text-[26px]">
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
