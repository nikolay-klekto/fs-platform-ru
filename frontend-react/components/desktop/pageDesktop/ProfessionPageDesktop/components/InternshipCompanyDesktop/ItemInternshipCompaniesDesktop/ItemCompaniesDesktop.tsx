'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

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
        <div
            ref={itemRef}
            className="relative flex h-auto w-[clamp(280px,_20vw,_328px)] shrink-0 cursor-pointer rounded-[60px] text-center"
        >
            <div className="relative aspect-[4/5] w-full">
                <Image src={image.src} alt={image.alt} fill className="rounded-[20px] opacity-60" />
            </div>
            <div className="absolute inset-0 flex size-full flex-col items-start justify-between pl-[20px]">
                <div className="mt-[21px] text20px_desktop font-semibold text-white">{industry}</div>
                <div className="flex flex-col items-start">
                    <div className="pl-[10px] text30px_desktop font-semibold text-white">{name}</div>
                    <p className="mb-[23px] w-full rounded-[50px] bg-white pl-[10px] pr-[42px]  text24px_desktop font-medium leading-[40px] tracking-normal text-[#878797]">
                        от{' '}
                        <span className="bg-gradient-desktop bg-clip-text text28px_desktop text-transparent ">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ItemCompaniesDesktop
