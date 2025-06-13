'use client'
import React from 'react'
import Image from 'next/image'

interface IItemCompaniesDesktop {
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    name: string
}

interface IItemCompaniesDesktop {
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    name: string
}

const ItemCompaniesDesktop: React.FC<IItemCompaniesDesktop> = ({ image, name }) => {
    return (
        <div className="relative flex h-auto max-w-[328px] shrink-0 cursor-pointer rounded-[60px] text-center">
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="rounded-[60px]"
            />
            <div className="absolute bottom-6 left-6 max-w-[210px] rounded-[23px] bg-white">
                <p className="text22px_desktop truncate px-[24px] font-medium text-[#101030]">{name}</p>
            </div>
        </div>
    )
}

export default ItemCompaniesDesktop
