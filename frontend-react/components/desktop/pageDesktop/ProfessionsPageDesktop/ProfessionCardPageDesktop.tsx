'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'

interface ProfessionCardDesktopProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardPageDesktop: React.FC<ProfessionCardDesktopProps> = ({ image, profession, price }) => {
    return (
        <>
            <Card
                className="3xl:px-[20px] hover:button-shadow_around_desktop_custom 3xl:py-[15px] 3xl:w-[340px] flex h-[400px] cursor-pointer flex-col justify-between rounded-[50px] border-none bg-cover bg-center px-[20px] py-[25px] 2xl:px-[15px] 2xl:py-[10px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardTitle
                    className="w-fit rounded-[25px] bg-white bg-opacity-[70%] px-[20px] 
                py-[2px] text-[24px] font-medium text-[#101030]"
                >
                    {profession}
                </CardTitle>
                <CardFooter className="pb-0 pl-0 2xl:px-0">
                    <p className=" text24px_desktop w-fit rounded-[25px] bg-white px-[20px] py-[5px] font-medium leading-[40px] tracking-normal text-[#878797] 2xl:px-[10px]">
                        от{' '}
                        <span className="bg-gradient-desktop text28px_desktop bg-clip-text font-medium text-transparent">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ProfessionCardPageDesktop
