'use client'
import React from 'react'
import Image from 'next/image'

interface IIntershipsCard {
    title: string
    subtitle: string
    image: string
    date: string
    time: string
    city: string
    place: string
    note: string
    mapImage: string
}

const ItemCardUpcomingInternshipsDesktop: React.FC<IIntershipsCard> = ({
    title,
    subtitle,
    image,
    date,
    time,
    city,
    place,
    note,
    mapImage,
}) => {
    return (
        <div className="flex flex-col rounded-[50px] w-[1069px] min-w-[700px] bg-white/10 p-[40px]">
            <div className="mb-[40px] flex items-center gap-[35px]">
                <div className="pl-[45px]">
                    <h2 className="text32px_desktop text-gradient_desktop_custom mb-[10px] font-medium uppercase">
                        {title}
                    </h2>
                    <p className="text18px_desktop custom-grey mb-[20px] font-medium">{subtitle}</p>
                    <p className="text18px_desktop mb-[20px] font-medium">
                        {date} в {time}
                    </p>
                    <p className="text24px_desktop mb-[23px] font-medium">
                        {city}, {place}
                    </p>
                    <p className="text15px_desktop font-medium custom-grey">{note}</p>
                </div>
                <div className="relative w-full max-w-[332px] aspect-[332/328] rounded-[50px] overflow-hidden">
                    <Image src={image} fill alt={title} className="object-cover object-center" />
                </div>
            </div>
            <div className="relative w-full h-[180px] rounded-[25px] mb-[40px] overflow-hidden">
                <Image src={mapImage} alt="Карта превью" fill className="rounded-[26px] object-cover" />
                <div className="absolute inset-0 bg-[#1F203F] opacity-90 rounded-[25px] flex items-center justify-center">
                    <a href="/#" className="text-[#878797] text24px_desktop hover:text-gray-200">
                        Смотреть на карте
                    </a>
                </div>
            </div>
            <div className="self-end text20px_desktop custom-grey underline hover:text-gray-200">
                <a href="/#">Отменить заказ</a>
            </div>
        </div>
    )
}

export default ItemCardUpcomingInternshipsDesktop
