'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface ItemCompaniesDesktopProps {
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    price: number
    onWidthChange: (width: number) => void
}

const ItemCompaniesDesktop: React.FC<ItemCompaniesDesktopProps> = ({ image, price, onWidthChange }) => {
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
    }, [])

    return (
        <div
            ref={itemRef}
            className="flex justify-center items-end flex-shrink-0 w-[clamp(160px,_14vw,_228px)] h-[clamp(100px,_8vw,_142px)] pb-[clamp(16px,_1.5vw,_28px)] px-2 pt-6 border-2 border-[#878797] rounded-[25px] "
        >
            <div className="flex flex-col items-center gap-[clamp(6px,_0.4vw,_13px)] w-full">
                <div className="flex justify-center">
                    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
                </div>
                <p className="text-[#878797] text-[19px] 3xl:text-4xl 2xl:text-3xl">
                    от{' '}
                    <span className="bg-gradient-desktop text-6xl 3xl:text-5xl 2xl:text-3xl bg-clip-text text-transparent">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </div>
        </div>
    )
}

export default ItemCompaniesDesktop
