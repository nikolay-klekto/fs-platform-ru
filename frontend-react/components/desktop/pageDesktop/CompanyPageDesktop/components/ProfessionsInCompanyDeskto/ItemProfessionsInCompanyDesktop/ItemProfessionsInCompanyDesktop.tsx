'use client'
import React from 'react'
import { Card, CardFooter } from '@/components/ui/card'

interface IItemProfessionsInCompanyDesktop {
    image: {
        src: string
        alt: string
        // width: number
        // height: number
    }
    name: string
}

const ItemProfessionsInCompanyDesktop: React.FC<IItemProfessionsInCompanyDesktop> = ({ image, name }) => {
    return (
        <div className="relative flex h-auto w-[clamp(180px,_20vw,_328px)] shrink-0 cursor-pointer rounded-[60px] text-center">
            <Card
                style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                hoverShadow={'with_hover_shadow'}
                className="relative aspect-[4/5] w-full rounded-[60px] mt-[63px] mb-[92px]"
            >
                <CardFooter className="absolute bottom-6 left-6 max-w-[210px] rounded-[23px] bg-white">
                    <p className="text-[22px] truncate px-[24px] py-[5px] font-medium text-[#101030]">{name}</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ItemProfessionsInCompanyDesktop
