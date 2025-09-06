'use client'

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
    companyUrl: string
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
    companyUrl,
    mapImage,
    mapUrl,
}) => {
    return (
        <Card className="flex w-full min-w-[700px] max-w-[1069px] flex-col bg-[#FFFFFF1A] p-[40px]">
            <CardContent className="mb-[40px] flex items-center gap-[67px] p-0">
                <div className="pl-[45px]">
                    <CardHeader className="m-0 flex-row space-y-0 p-0">
                        <CardTitle className="text-gradient_desktop_custom rounded-none pb-[10px] text-[32px] font-medium uppercase">
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <p className="custom-grey pb-[20px] text-[18px] font-medium">{subtitle}</p>

                    <p className="pb-[20px] text-[18px] font-medium">
                        {date} в {time}
                    </p>
                    <p className="pb-[23px] text-[24px] font-medium">
                        {city}, {place}
                    </p>
                    <p className="custom-grey text-[15px] font-medium">
                        {'!Возьмите с собой паспорт и ознакомьтесь с компанией на '}
                        <a
                            href={companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-1 underline-offset-2"
                        >
                            официальном сайте
                        </a>
                    </p>
                </div>
                <div className="relative aspect-[332/328] w-full max-w-[332px] overflow-hidden rounded-[50px]">
                    <Image src={image} fill alt={'Фото офиса EPAM'} className="object-cover object-center" />
                </div>
            </CardContent>
            <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[24px] font-medium text-[#878797]"
            >
                <div className="relative h-[180px] w-full overflow-hidden rounded-[25px]">
                    <Image
                        src={mapImage}
                        alt="Изображение карты"
                        fill
                        className="translate-full transform-gpu object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1F203F] opacity-90">
                        Смотреть на карте
                    </div>
                </div>
            </a>
            <CardFooter className="mt-[40px] self-end">
                <button
                    type="button"
                    className="text-[20px] font-semibold text-[#878797] underline decoration-1 underline-offset-4"
                >
                    Отменить заказ
                </button>
            </CardFooter>
        </Card>
    )
}

export default ItemCardUpcomingInternshipsDesktop
