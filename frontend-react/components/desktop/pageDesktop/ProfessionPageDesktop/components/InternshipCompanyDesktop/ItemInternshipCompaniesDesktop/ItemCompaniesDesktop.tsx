'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface IItemCompaniesDesktop {
    image: {
        src: string
        alt: string
    }
    industry: string
    name: string
    price: number
    onWidthChange: (width: number) => void
}

const ItemCompaniesDesktop: React.FC<IItemCompaniesDesktop> = ({ image, name, industry, price, onWidthChange }) => {
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
            className="relative mb-[77px] mt-[63px] flex h-auto w-[clamp(280px,_20vw,_328px)] shrink-0 cursor-pointer rounded-[20px] text-center"
            hoverShadow={true}
        >
            <CardContent className="relative aspect-[4/5] w-full">
                <Image src={image.src} alt={image.alt} fill className="rounded-[20px] opacity-60 object-cover" />

                <div className="absolute inset-0 flex size-full flex-col items-start justify-between p-[20px]">
                    <div className="text20px_desktop font-semibold text-white z-10">{industry}</div>

                    <div className="flex flex-col items-start w-full z-10">
                        <div className="text30px_desktop pl-[10px] font-semibold text-white">{name}</div>

                        <CardFooter className="w-full">
                            <p className="w-full rounded-[50px] bg-white text24px_desktop font-medium leading-[40px] tracking-normal text-[#878797]">
                                от{' '}
                                <span className="bg-gradient-desktop pr-[1px] bg-clip-text text28px_desktop text-transparent">
                                    {price} BYN/
                                </span>
                                неделя
                            </p>
                        </CardFooter>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ItemCompaniesDesktop
