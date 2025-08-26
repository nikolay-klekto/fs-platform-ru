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
                        <CardTitle className="text-[32px] text-gradient_desktop_custom rounded-none pb-[10px] font-medium uppercase">
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <p className="text-[18px] custom-grey pb-[20px] font-medium">{subtitle}</p>

                    <p className="text-[18px] pb-[20px] font-medium">
                        {date} в {time}
                    </p>
                    <p className="text-[24px] pb-[23px] font-medium">
                        {city}, {place}
                    </p>
                    <p className="text-[15px] font-medium custom-grey">{note}</p>
                </div>
                <div className="relative w-full max-w-[332px] aspect-[332/328] rounded-[50px] overflow-hidden">
                    <Image src={image} fill alt={'Фото офиса EPAM'} className="object-cover object-center" />
                </div>
            </CardContent>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-[24px] text-[#878797]">
                <div className="relative w-full h-[180px] rounded-[25px] overflow-hidden">
                    <Image
                        src={mapImage}
                        alt="Изображение карты"
                        fill
                        className="object-cover transform-gpu translate-full"
                    />
                    <div className="absolute inset-0 top-0 left-0 bg-[#1F203F] opacity-90 flex items-center justify-center">
                        Смотреть на карте
                    </div>
                </div>
            </a>
            <CardFooter className="self-end mt-[40px]">
                <button
                    type="button"
                    className="text-[20px] text-[#878797] font-semibold underline underline-offset-4 decoration-1"
                >
                    Отменить заказ
                </button>
            </CardFooter>
        </Card>
    )
}

export default ItemCardUpcomingInternshipsDesktop
