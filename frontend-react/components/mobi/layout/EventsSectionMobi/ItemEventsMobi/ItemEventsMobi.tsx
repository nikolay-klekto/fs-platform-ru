import React from 'react'
import Image from 'next/image'

interface EventSectionMobiProps {
    image: string
    title: string
    date: string
    adress: string
}

const ItemEventsMobi: React.FC<EventSectionMobiProps> = ({ image, title, date, adress }) => {
    const [day, month] = date.split(' ')

    return (
        <div className="pb-[32px]">
            <div className="relative min-h-[294px] min-w-[346px]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[25px] select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#232341] rounded-[25px]" />
                <div className="absolute right-[14px] top-[14px] w-[60px] h-[69px] rounded-[15px] bg-white bg-opacity-80 flex flex-col justify-center items-center">
                    <p className="text-4xl leading-[22px] font-semibold text-[#1f203f]">{day}</p>
                    <p className="text-base leading-[15px] font-medium text-[#878797]">{month}</p>
                </div>
                <div className="absolute left-[14px] bottom-[14px] inline-block">
                    <p className="uppercase text-4xl leading-[22px] pb-[14px] font-semibold text-white min-h-[44px] max-h-[44px] flex items-end">
                        {title}
                    </p>
                    <p className="text-base  font-medium text-[#878797]">{adress}</p>
                </div>
            </div>
        </div>
    )
}
export default ItemEventsMobi
