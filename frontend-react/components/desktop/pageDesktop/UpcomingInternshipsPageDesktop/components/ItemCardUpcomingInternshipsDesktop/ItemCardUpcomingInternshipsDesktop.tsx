'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
}) => {
    return (
        <Card className="flex flex-col w-[1069px] min-w-[700px] bg-white/10 p-[40px]">
            <CardContent className="mb-[40px] p-0 flex items-center gap-[35px]">
                <div className="pl-[45px]">
                    <CardHeader className="space-y-0 p-0 m-0">
                        <CardTitle className="text-[32px] text32px_desktop text-gradient_desktop_custom rounded-none pb-[10px] font-medium uppercase">
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <p className="text-[18px] text18px_desktop custom-grey pb-[20px] font-medium">{subtitle}</p>

                    <p className="text-[18px] text18px_desktop pb-[20px] font-medium">
                        {date} в {time}
                    </p>
                    <p className="text-[24px] text24px_desktop pb-[23px] font-medium">
                        {city}, {place}
                    </p>
                    <p className=" text-[15px] text15px_desktop font-medium custom-grey">{note}</p>
                </div>
                <div className="relative w-full max-w-[332px] aspect-[332/328] rounded-[50px] overflow-hidden">
                    <Image src={image} fill alt={'Фото офиса EPAM'} className="object-cover object-center" />
                </div>
            </CardContent>
            <div className="relative w-full h-[180px] rounded-[25px] mb-[40px] overflow-hidden">
                <Image src={mapImage} alt="Карта превью" fill className="rounded-[26px] object-cover" />
                <div className="absolute inset-0 bg-[#1F203F] opacity-90 rounded-[25px] flex items-center justify-center">
                    <a href="/#" className="text-[#878797] text24px_desktop hover:text-gray-200">
                        Смотреть на карте
                    </a>
                </div>
            </div>
            <CardFooter className="self-end ">
                <Button
                    variant="link"
                    className="text20px_desktop text-[#878797] underline underline-offset-4 hover:text-gray-200"
                >
                    Отменить заказ
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ItemCardUpcomingInternshipsDesktop
