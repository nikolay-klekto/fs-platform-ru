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
        <div className="pb-8 flex min-w-full max-w-full sm_xl:min-w-[345px] sm_xl:max-w-[345px] md:min-w-[345px] md:max-w-[345px]">
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[1.5rem] select-none pointer-events-none "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#232341] rounded-[1.5rem]" />
                <div className="absolute right-[5%] top-[4%] flex flex-col justify-center items-center aspect-[113/100] w-[25%] rounded-[1rem] bg-white bg-opacity-80">
                    <p className="font-semibold text-[#1f203f] text-4xl">{day}</p>
                    <p className="leading-[15px] font-medium text-[#878797] text-base">{month}</p>
                </div>
                <div className="absolute left-[0.875rem] bottom-[0.875rem] flex flex-col items-start pr-[0.875rem] max-w-[85%]">
                    <p className="uppercase pb-[0.875rem] font-semibold text-white  text-4xl sm_l:text-4xl sm_s:text-2xl sm:text-2xl max-w-full overflow-hidden">
                        {title}
                    </p>
                    <p className="font-medium text-[#878797] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-base">
                        {adress}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ItemEventsMobi
