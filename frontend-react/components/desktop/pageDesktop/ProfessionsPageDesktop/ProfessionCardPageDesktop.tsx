'use client'

import React from 'react'
import { Card, CardTitle, CardFooter } from '@/components/ui/card'
import { useModal } from '@/context/ContextModal' 

interface ProfessionCardDesktopProps {
    profession: { id: string; name: string }
    image: string
    price: string
    isAvailable: boolean 
}

const ProfessionCardPageDesktop: React.FC<ProfessionCardDesktopProps> = ({ image, profession, price, isAvailable }) => {
    const { setNotifyModalOpen } = useModal() 

    const handleClick = () => {
        if (!isAvailable) {
            setNotifyModalOpen(true) 
        }
    }

    return (
        <Card
            variant={'profession_page_desktop'}
            size={'profession_page_desktop'}
            style={{ backgroundImage: `url(${image})` }}
            className="cursor-pointer"
            onClick={handleClick} 
        >
            <CardTitle
                variant={'profession_page_desktop'}
                size={'profession_page_desktop'}
                rounded={'rounded_25px'}
            >
                {profession.name}
            </CardTitle>
            <CardFooter
                variant={'profession_page_desktop'}
                size={'profession_page_desktop'}
                rounded={'rounded_25px'}
            >
                <p className="4xl:text-4xl 3xl:text-4xl text-7xl leading-[40px] tracking-normal text-[#878797] 2xl:text-3xl">
                    от{' '}
                    <span className="bg-gradient-desktop 4xl:text-6xl 3xl:text-5xl bg-clip-text text-8xl text-transparent 2xl:text-4xl">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </CardFooter>
        </Card>
    )
}

export default ProfessionCardPageDesktop
