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
    name: string
    onWidthChange: (width: number) => void
}

const ItemCompaniesDesktop: React.FC<IItemCompaniesDesktop> = ({ image, name, onWidthChange }) => {
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
        <div ref={itemRef} className="relative flex h-auto max-w-[328px] shrink-0 rounded-[60px] text-center">
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="rounded-[60px]"
            />
            <div className="absolute bottom-12 left-8 rounded-[10px] bg-white">
                <p className="text-[19px] text-[#878797] 2xl:text-3xl 3xl:text-4xl">{name}</p>
            </div>
        </div>
    )
}

export default ItemCompaniesDesktop
