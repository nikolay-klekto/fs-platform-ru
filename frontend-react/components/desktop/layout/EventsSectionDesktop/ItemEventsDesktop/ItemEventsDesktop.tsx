import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface EventSectionDesktopProps {
    image: string
    title: string
    date: string
    onWidthChange: (width: number) => void
}

const ItemEventsDesktop: React.FC<EventSectionDesktopProps> = ({ image, title, date, onWidthChange }) => {
    const [day, month] = date.split(' ')

    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (itemRef.current) {
            onWidthChange(itemRef.current.offsetWidth)
        }
    }, [])

    return (
        <div ref={itemRef} className="pb-[100px] lg:pb-[70px] xl:pb-[78px] 2xl:pb-[84px]">
            <div className="4xl:w-[421px] 3xl:w-[389px] relative aspect-[4/3] w-[520px] lg:w-[207px] xl:w-[276px] 2xl:w-[345px]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="3xl:rounded-[45px] pointer-events-none select-none rounded-[50px] object-cover lg:rounded-[35px] xl:rounded-[40px] 2xl:rounded-[45px]"
                />
                <div className="4xl:w-[92px] 3xl:w-[85px] absolute right-[5%] top-[4%] flex aspect-[113/100] w-[114px] flex-col items-center justify-center rounded-[23px] bg-white bg-opacity-80 lg:w-[60px] lg:rounded-[16px] xl:w-[60px] xl:rounded-[18px] 2xl:w-[75px] 2xl:rounded-[20px]">
                    <p className="text28px_desktop font-semibold text-[#1f203f]">{day}</p>
                    <p className="text18px_desktop font-medium text-[#878797]">{month}</p>
                </div>
            </div>
            <p className="text28px_desktop line-clamp-2 max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis pt-5 font-medium uppercase leading-[1.2] text-white">
                {title}
            </p>
        </div>
    )
}
export default ItemEventsDesktop
