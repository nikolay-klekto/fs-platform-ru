'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface ItemCompaniesMobiProps {
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    onWidthChange: (width: number) => void
}

const ItemCompaniesMobi: React.FC<ItemCompaniesMobiProps> = ({ image, onWidthChange }) => {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateWidth = () => {
            if (itemRef.current) {
                onWidthChange(itemRef.current.offsetWidth)
                console.log('itemRef ', itemRef)
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
            className="flex justify-center items-center flex-shrink-0 w-[116px] h-[45px] sm_s:[99px] sm_s:h-[38px] sm:[99px] sm:h-[38px] border-2 border-[#878797] rounded-[16px] "
        >
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="object-contain"
            />
        </div>
    )
}

export default ItemCompaniesMobi
