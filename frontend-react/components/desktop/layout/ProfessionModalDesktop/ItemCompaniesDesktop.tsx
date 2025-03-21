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
    price: number
    onWidthChange: (width: number) => void
}

const ItemCompaniesDesktop: React.FC<IItemCompaniesDesktop> = ({ image, price, onWidthChange }) => {
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
            className="flex h-auto w-[clamp(160px,_14vw,_228px)] shrink-0 items-end justify-center rounded-[25px] border-2 border-[#878797] px-2 pb-[clamp(16px,_1.5vw,_28px)] pt-6 text-center"
        >
            <div className="flex w-full flex-col items-center gap-[clamp(6px,_0.4vw,_13px)]">
                <div className="flex justify-center">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <p className="3xl:text-4xl text-[19px] text-[#878797] 2xl:text-3xl">
                    от{' '}
                    <span className="bg-gradient-desktop 3xl:text-5xl bg-clip-text text-6xl text-transparent 2xl:text-3xl">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </div>
        </div>
    )
}

export default ItemCompaniesDesktop
