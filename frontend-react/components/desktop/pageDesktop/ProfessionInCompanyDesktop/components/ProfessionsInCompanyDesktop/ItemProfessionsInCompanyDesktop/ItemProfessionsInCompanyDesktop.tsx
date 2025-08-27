'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface IItemProfessionsInCompanyDesktop {
    image: {
        src: string
        alt: string
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
        <div
            ref={itemRef}
            className="relative flex h-auto w-[clamp(180px,_20vw,_328px)] shrink-0 cursor-pointer rounded-[60px] text-center"
        >
            <div className="relative aspect-[4/5] w-full">
                <Image src={image.src} alt={image.alt} fill className="rounded-[60px]" />
            </div>
            <div className="absolute bottom-6 left-6 max-w-[210px] rounded-[23px] bg-white">
                <p className="truncate px-[24px] py-[5px] text-[22px] font-medium text-[#101030]">{name}</p>
            </div>
        </div>
    )
}

export default ItemProfessionsInCompanyDesktop
