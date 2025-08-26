'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface IInternshipsCard {
    title: string
    subtitle: string
    image: string
    date: string
    time: string
    city: string
    place: string
    note: string
    mapImage: string
    mapUrl: string
}

const ItemCardUpcomingInternshipsDesktop: React.FC<IInternshipsCard> = ({
    title,
    subtitle,
    image,
    date,
    time,
    city,
    place,
    note,
    mapImage,
    mapUrl,
}) => {
    return (
        <Card className="flex flex-col w-full max-w-[1069px] min-w-[700px] bg-[#FFFFFF1A] p-[40px]">
            <CardContent className="mb-[40px] p-0 flex items-center gap-[67px]">
                <div className="pl-[45px]">
                    <CardHeader className="flex-row space-y-0 p-0 m-0">
                        <CardTitle className="text-[32px] text32px_desktop text-gradient_desktop_custom rounded-none pb-[10px] font-medium uppercase">
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <p className="text18px_desktop custom-grey pb-[20px] font-medium">{subtitle}</p>

                    <p className="text18px_desktop pb-[20px] font-medium">
                        {date} в {time}
                    </p>
                    <p className="text24px_desktop pb-[23px] font-medium">
                        {city}, {place}
                    </p>
                    <p className="text15px_desktop font-medium custom-grey">{note}</p>
                </div>
                <div className="relative w-full max-w-[332px] aspect-[332/328] rounded-[50px] overflow-hidden">
                    <Image src={image} fill alt={'Фото офиса EPAM'} className="object-cover object-center" />
                </div>
            </CardContent>
            <div className="relative w-full h-[180px] rounded-[25px] mb-[40px] overflow-hidden">
                <Image
                    src={mapImage}
                    alt="Изображение карты"
                    fill
                    className="object-cover transform-gpu translate-full"
                />
                <div className="absolute inset-0 top-0 left-0 bg-[#1F203F] opacity-90 flex items-center justify-center">
                    <button className="text24px_desktop text-[#878797]">
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                            Смотреть на карте
                        </a>
                    </button>
                </div>
            </div>
            <CardFooter className="self-end">
                <button className="text20px_desktop text-[#878797]">
                    <span className="border-[#878797] border-b-[1px]">Отменить заказ</span>
                </button>
            </CardFooter>
        </Card>
    )
}

export default ItemCardUpcomingInternshipsDesktop
