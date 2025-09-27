'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { MONTHS } from '../EventsSectionDesktop'

interface IEventSection {
    image: string
    title: string
    date: string
}

function parseDateForDisplay(dateStr: string): { day: string; month: string } {
    const jsDate = new Date(dateStr)
    if (!isNaN(jsDate.getTime())) {
        const day = jsDate.getDate().toString().padStart(2, '0')
        const month = MONTHS[jsDate.getMonth()]
        return { day, month }
    }

    const [dayRaw, monthRaw] = dateStr.split(' ')
    return { day: dayRaw || '', month: monthRaw || '' }
}

const ItemEventsDesktop: React.FC<IEventSection> = ({ image, title, date }) => {
    const { day, month } = parseDateForDisplay(date)

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
                    <p className="text-9xl font-semibold text-[#1f203f] 2xl:text-4xl 3xl:text-6xl 4xl:text-7xl">
                        {day}
                    </p>
                    <p className="text-4xl font-medium text-[#878797] 2xl:text-lg 3xl:text-xl 4xl:text-2xl">{month}</p>
                </div>
            </div>
            <p className="line-clamp-2 max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis pt-5 text-9xl font-medium uppercase leading-[1.2] text-white 2xl:text-4xl 3xl:text-6xl 4xl:text-7xl">
                {title}
            </p>
        </div>
    )
}

export default ItemEventsDesktop
