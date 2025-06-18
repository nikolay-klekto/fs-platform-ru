'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface IItemCompaniesDesktop {
    image: {
        src: string
        alt: string
        width: number
        height: number
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
        <div ref={itemRef} className="relative flex h-auto max-w-[328px] shrink-0 rounded-[20px] text-center ">
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="rounded-[20px] opacity-60"
            />
            <div className="absolute inset-0 w-full flex flex-col justify-between items-start h-full  pl-[20px]">
                <div className="text-[21px] mt-[21px] font-semibold text-white">{industry}</div>
                <div className="flex flex-col items-start">
                    <div className="text-[30px] pl-[10px] text-white font-semibold">{name}</div>
                    <p className="bg-white w-full rounded-[50px] pl-[10px] mb-[23px] pr-[42px]  text-[24px] leading-[40px] tracking-normal text-[#878797] font-medium">
                        от{' '}
                        <span className="bg-gradient-desktop bg-clip-text text-[[28px] text-transparent ">
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
