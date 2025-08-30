'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    MapDesktop,
    CalendarIconsDesktop,
    UserDesktop,
    ForwardIconWhiteDesktop,
} from '@/components/assets/iconsDesktop'

interface IEventsCard {
    title: string
    category: string
    image: string
    date: string
    week: string
    time: string
    city: string
    place: string
    company: string
}

const EventsCardDesktop: React.FC<IEventsCard> = ({
    title,
    category,
    image,
    date,
    week,
    time,
    city,
    place,
    company,
}) => {
    return (
        <>
            <div
                data-category={category}
                className="relative flex flex-col
                aspect-[474/657]
                flex-1
                justify-start rounded-[3.125rem] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                style={{
                    backgroundImage: "url('/background/subtract-events.png')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div>
                    <div className="px-[20px] pt-[20px] flex flex-col gap-[20px]">
                        <div className="relative aspect-[434/358] w-full">
                            <Image
                                src={image}
                                fill
                                alt={title}
                                className="pointer-events-none select-none rounded-[3.125rem] object-cover"
                            />
                        </div>

                        <div className=" text28px_desktop text-gradient_desktop_custom pb-[5px] uppercase leading-tight">
                            {title}
                        </div>
                        <div className="text18px_desktop flex gap-[15px]">
                            <MapDesktop /> {date} ({week}) в {time}
                        </div>
                        <div className="text18px_desktop flex gap-[15px]">
                            <CalendarIconsDesktop /> {city}, {place}
                        </div>
                        <div className="text18px_desktop flex gap-[15px]">
                            <UserDesktop /> {company}
                        </div>
                        <Button
                            variant="circleDarkBlue"
                            size="circle_desktop"
                            className="absolute -right-0 -bottom-0 2xl:h-18 3xl:h-[4rem] 2xl:p-[16px]"
                        >
                            <ForwardIconWhiteDesktop />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventsCardDesktop
