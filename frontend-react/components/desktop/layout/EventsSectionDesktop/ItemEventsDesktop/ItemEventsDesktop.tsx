import React from 'react'
import Image from 'next/image'

interface EventSectionDesktopProps {
    image: string
    title: string
    date: string
}

const ItemEventsDesktop: React.FC<EventSectionDesktopProps> = ({ image, title, date }) => {
    const [day, month] = date.split(' ')

    return (
        <div className="pb-[100px]">
            <div className="relative min-h-[454px] min-w-[520px]">
                <Image src={image} fill alt={title} className="object-cover rounded-[50px]" />
                <div className="absolute right-[23px] top-[18px] w-[114px] h-[101px] rounded-[23px] bg-white bg-opacity-80 flex flex-col justify-center items-center">
                    <p className="text-9xl font-semibold text-[#1f203f]">{day}</p>
                    <p className="text-4xl font-medium text-[#878797]">{month}</p>
                </div>
            </div>
            <p className="uppercase text-9xl font-medium text-white pt-5 min-h-[64px] max-h-[64px]">{title}</p>
        </div>
    )
}
export default ItemEventsDesktop
