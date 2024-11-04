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
            <div className="relative aspect-[4/3] w-[295px] md:w-[390px] sm_xl:w-[345px] sm_l:w-[295px] sm:w-[290px]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[25px] select-none pointer-events-none "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#232341] rounded-[25px]" />
                <div className="absolute right-[14px] top-[14px] aspect-[87/100] w-[60px] sm_l:w-[55px] sm:w-[55px] rounded-[15px] bg-white bg-opacity-80 flex flex-col justify-center items-center">
                    <p className="text18px_mobi font-semibold text-[#1f203f]">{day}</p>
                    <p className="text12px_mobi leading-[15px] font-medium text-[#878797]">{month}</p>
                </div>
                <div className="absolute left-[14px] bottom-[14px] pr-[14px] inline-block">
                    <p className="uppercase text18px_mobi pb-[14px] font-semibold text-white min-h-[44px] max-h-[44px] flex items-end">
                        {title}
                    </p>
                    <p className="text12px_mobi font-medium text-[#878797] max-w-[85%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {adress}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ItemEventsMobi
