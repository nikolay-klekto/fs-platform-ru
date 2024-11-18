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
                className="3xl:px-[20px] hover:shadow_desktop_custom 3xl:py-[15px] flex cursor-pointer flex-col justify-between rounded-[50px] border-none bg-cover bg-center px-[30px] py-[20px] 2xl:px-[15px] 2xl:py-[10px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardHeader className="pl-0 pt-3">
                    <CardTitle className="text30px_desktop w-fit rounded-[50px] bg-white bg-opacity-[70%] px-[20px] py-[10px] font-semibold tracking-normal text-[#101030]">
                        {profession}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="pb-3 pl-0 2xl:px-0">
                    <p className=" text24px_desktop w-fit rounded-[50px] bg-white bg-opacity-[100] px-[15px] py-[5px] font-medium text-[#878797] 2xl:px-[10px]">
                        от{' '}
                        <span className="bg-gradient-desktop text36px_desktop bg-clip-text font-medium text-transparent">
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
