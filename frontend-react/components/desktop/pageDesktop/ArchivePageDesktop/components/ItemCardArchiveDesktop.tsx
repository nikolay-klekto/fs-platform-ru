'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { StarIconDesktop } from '@/components/assets/iconsDesktop'

interface IItemCardArchiveDesktop {
    image: string
    companyName: string
    profession: string
    dates: string
    rating: number
}

const ItemCardArchiveDesktop: React.FC<IItemCardArchiveDesktop> = ({
    image,
    companyName,
    profession,
    dates,
    rating,
}) => {
    return (
        <Card className="w-full flex flex-col items-center bg-gradient-to-b from-[#28295A] to-[#191945] rounded-[32px] px-6 pt-6 pb-8 shadow-lg min-h-[500px]">
            {/* Фотография */}
            <div className="w-full aspect-[367/360] rounded-[24px] overflow-hidden mb-6 max-w-[367px]">
                <Image
                    src={image}
                    alt={companyName}
                    width={367}
                    height={360}
                    className="object-cover w-full h-full"
                    priority
                />
            </div>
            {/* Название компании */}
            <div className="text-[36px] font-medium mb-[10px] uppercase tracking-wider text-center bg-gradient-desktop bg-clip-text text-transparent">
                {companyName}
            </div>
            {/* Профессия */}
            <div className="text-[24px] font-medium mb-[10px] text-white text-center">{profession}</div>
            {/* Даты */}
            <div className="text-[15px] font-medium text-[#C7C7E1] text-center mb-[30px]">{dates}</div>
            {/* Рейтинг (звезды) */}
            <div className="flex items-center justify-center gap-[5px] mb-[20px]">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarIconDesktop key={i} filled={i < rating} />
                ))}
            </div>
            {/* Кнопка */}
            <Button variant={'send_btn_desktop'} size={'send_btn_desktop'} className="py-5 px-[45px]">
                Отправить отзыв
            </Button>
        </Card>
    )
}

export default ItemCardArchiveDesktop
