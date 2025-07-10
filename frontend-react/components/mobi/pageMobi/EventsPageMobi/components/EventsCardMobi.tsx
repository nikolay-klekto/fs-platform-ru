'use client'

import Image from 'next/image'
import React from 'react'

interface IEventsCard {
    title: string
    category: string
    image: string
    date: string
    time: string
    city: string
    place: string
    company: string
}

const EventsCardMobi: React.FC<IEventsCard> = ({ title, category, image, date, city, place, company }) => {
    const jsDate = new Date(date)
    const day = jsDate.getDate().toString().padStart(2, '0')
    const month = jsDate.getMonth()
    const monthNames = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ]
    const displayMonth = monthNames[month]

    return (
        <>
            <div
                data-category={category}
                className=" sm_l:h-[280px relative h-[294px] w-[346px] items-center justify-center overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)] will-change-transform sm:h-[260px] sm:w-[300px] sm_s:h-[272px] sm_s:w-[316px] sm_l:w-[330px]"
                style={{ clipPath: 'inset(0 round 25px)' }}
            >
                <Image
                    src={image}
                    fill
                    priority
                    alt={title}
                    className="pointer-events-none z-0 select-none object-cover object-[15%_35%] sm_xl:scale-[1.02]"
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(12,12,12,0)] to-[#232341]"></div>

                <div className="absolute right-[3.76%] top-[4.42%] z-[3] flex h-[70px] w-[58px] flex-col items-center justify-center rounded-[15px] bg-white/80 px-[4px] text-center text-[#0B0B0B] shadow-md">
                    <div className="text22px_mobi font-semibold leading-[22px]">{day}</div>
                    <div className="text-[12px] font-medium leading-[15px] text-[#878797]">{displayMonth}</div>
                </div>
                <div className="absolute inset-x-[3.5%] bottom-[5.5%] z-[3] bg-transparent text-white">
                    <div className="text22px_mobi mb-[8px] font-semibold uppercase leading-[22px]">{title}</div>

                    <div className="text-[12px] font-medium leading-[15px] text-[#878797]">
                        {company}, {city}, {place}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventsCardMobi
