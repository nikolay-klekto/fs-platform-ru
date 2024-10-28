import React from 'react'
import Image from 'next/image'

interface EventSectionDesktopProps {
    image: string
    title: string
    date: string
}

const ItemEventsDesktop: React.FC<EventSectionDesktopProps> = ({ image, title, date }) => {
    return (
        <div className="pb-[30px]">
            <div className="relative min-h-[454px] min-w-[520px] ">
                <Image src={image} fill alt={title} className="object-cover" />
                <div className="absolute right-0 top-0 ">
                    {date.split(' ').map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ItemEventsDesktop
