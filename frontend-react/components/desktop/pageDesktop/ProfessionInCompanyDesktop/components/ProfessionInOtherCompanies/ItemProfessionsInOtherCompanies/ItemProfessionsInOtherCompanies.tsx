'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface IItemProfessionsInOtherCompanyDesktop {
    image: {
        src: string
        alt: string
    }
    onWidthChange?: (width: number) => void
}

const ItemProfessionsInOtherCompanyDesktop: React.FC<IItemProfessionsInOtherCompanyDesktop> = ({
    image,
    onWidthChange,
}) => {
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
            className="flex h-[123px] w-[316px] shrink-0 cursor-pointer items-center justify-center rounded-[92px] border-[3.71px] border-[#878797]"
        >
            <div className="relative h-[53px] w-[100px]">
                <Image src={image.src} alt={image.alt} fill />
            </div>
        </div>
    )
}

export default ItemProfessionsInOtherCompanyDesktop
