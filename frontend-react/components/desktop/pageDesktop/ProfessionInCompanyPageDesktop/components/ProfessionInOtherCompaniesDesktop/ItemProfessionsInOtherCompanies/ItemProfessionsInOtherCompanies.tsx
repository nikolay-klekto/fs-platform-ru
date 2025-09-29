'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { IItemCardDesktop } from '@/types/item-cards/item-cards'

const ItemProfessionsInOtherCompanyDesktop: React.FC<IItemCardDesktop> = ({ image, onWidthChange }) => {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!onWidthChange) return

        const updateWidth = () => {
            if (itemRef.current) {
                onWidthChange(itemRef.current.offsetWidth)
            }
        }

        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [onWidthChange])

    return (
        <div
            ref={itemRef}
            className="flex h-[123px] shrink-0 cursor-pointer items-center justify-center rounded-[43px] border-[3.5px] border-[#878797] px-[clamp(55px,60px,86px)]"
        >
            <div className="relative h-[53px] w-[100px]">
                <Image src={image.src} alt={image.alt} fill />
            </div>
        </div>
    )
}

export default ItemProfessionsInOtherCompanyDesktop
