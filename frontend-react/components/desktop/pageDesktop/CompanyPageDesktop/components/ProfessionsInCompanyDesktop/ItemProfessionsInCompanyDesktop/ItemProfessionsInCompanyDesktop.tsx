'use client'
import React, { useEffect, useRef } from 'react'
import { Card, CardFooter } from '@/components/ui/card'

interface IItemProfessionsInCompanyDesktop {
    image: {
        src: string
        alt: string
        // width: number
        // height: number
    }
    name: string
    onWidthChange: (width: number) => void
}

const ItemProfessionsInCompanyDesktop: React.FC<IItemProfessionsInCompanyDesktop> = ({
    image,
    name,
    onWidthChange,
}) => {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateWidth = () => {
            if (itemRef.current) {
                onWidthChange(itemRef.current.offsetWidth)
            }
        }

        updateWidth()
        window.addEventListener('resize', updateWidth)

        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [onWidthChange])

    return (
        <Card
            ref={itemRef}
            style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            hoverShadow={true}
            className="relative flex h-auto w-[clamp(180px,_20vw,_328px)] shrink-0 cursor-pointer rounded-[60px] text-center aspect-[4/5] mt-[63px] mb-[92px]"
        >
            <CardFooter className="absolute bottom-6 left-6 max-w-[210px] rounded-[23px] bg-white">
                <p className="text-[22px] truncate px-[24px] py-[5px] font-medium text-[#101030]">{name}</p>
            </CardFooter>
        </Card>
    )
}

export default ItemProfessionsInCompanyDesktop
