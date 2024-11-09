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
        <div className="pb-8">
            <div
                className="relative aspect-[4/3] w-[345px] sm_l:w-[295px] sm_s:w-[290px] sm:w-[290px]
"
            >
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[1.5rem] select-none pointer-events-none "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#232341] rounded-[1.5rem]" />
                <div className="absolute right-[5%] top-[4%] flex flex-col justify-center items-center aspect-[113/100] w-[22%] rounded-[1rem] bg-white bg-opacity-80">
                    <p className="font-semibold text-[#1f203f] text-4xl sm_l:text-2xl sm_s:text-xl sm:text-xl">{day}</p>
                    <p className="leading-[15px] font-medium text-[#878797] text-base sm_l:text-xs sm_s:text-xs sm:text-xs">
                        {month}
                    </p>
                </div>
                <div className="absolute left-[0.875rem] bottom-[0.875rem] pr-[0.875rem] inline-block">
                    <p className="uppercase pb-[0.875rem] font-semibold text-white flex items-end text-4xl sm_l:text-2xl sm_s:text-xl sm:text-xl">
                        {title}
                    </p>
                    <p className="font-medium text-[#878797] max-w-[85%] overflow-hidden whitespace-nowrap text-ellipsis text-base sm_l:text-xs sm_s:text-xs sm:text-xs">
                        {adress}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ItemEventsMobi
