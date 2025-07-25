'use client'

import React, { useRef } from 'react'
import Image from 'next/image'

interface IEventSection {
    image: string
    title: string
    date: string
}

const ItemEventsDesktop: React.FC<IEventSection> = ({ image, title, date }) => {
    const [day, month] = date.split(' ')

    const itemRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={itemRef} className="flex min-w-[27%] max-w-[27%] flex-col pt-[4vh]">
            <div className="hover:button-shadow_around_desktop_custom relative aspect-[4/3] w-full cursor-pointer rounded-[3.125rem]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="pointer-events-none select-none rounded-[3.125rem] object-cover 2xl:rounded-[2rem]"
                />
                <div className="absolute right-[5%] top-[4%] flex aspect-[113/100] w-[22%] flex-col items-center justify-center rounded-3xl bg-white bg-opacity-[80%] 2xl:rounded-2xl">
                    <p className="4xl:text-7xl 3xl:text-6xl text-9xl font-semibold text-[#1f203f] 2xl:text-4xl">
                        {day}
                    </p>
                    <p className="4xl:text-2xl 3xl:text-xl text-4xl font-medium text-[#878797] 2xl:text-lg">{month}</p>
                </div>
            </div>
            <p className="4xl:text-7xl 3xl:text-6xl line-clamp-2 max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis pt-5 text-9xl font-medium uppercase leading-[1.2] text-white 2xl:text-4xl">
                {title}
            </p>
        </div>
    )
}

export default ItemEventsDesktop
