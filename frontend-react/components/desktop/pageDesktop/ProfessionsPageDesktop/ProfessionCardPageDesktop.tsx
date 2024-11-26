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
                className="hover:button-shadow_around_desktop_custom relative flex aspect-[340/400] w-[340px] max-w-full cursor-pointer flex-col justify-between rounded-[50px] border-none bg-cover bg-center px-[20px] py-[25px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                <CardTitle
                    className="4xl:text-6xl 3xl:text-5xl 3xl:px-[15px] 4xl:px-[15px] 4xl:max-w-full w-fit max-w-full truncate
                rounded-[25px] bg-white bg-opacity-[70%] px-[20px] py-[2px] text-7xl font-medium text-[#101030]"
                >
                    {profession}
                </CardTitle>
                <CardFooter className="pb-0 pl-0 2xl:px-0">
                    <p className="4xl:px-[15px] 3xl:px-[15px] 4xl:text-4xl 3xl:text-4xl 4xl:py-[4px] w-fit whitespace-nowrap rounded-[25px] bg-white px-[20px] py-[5px] text-7xl font-medium leading-[40px] tracking-normal text-[#878797] 2xl:px-[10px]">
                        от{' '}
                        <span className="bg-gradient-desktop 4xl:text-6xl 3xl:text-5xl bg-clip-text text-8xl font-medium text-transparent">
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
