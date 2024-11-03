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
        <div ref={itemRef} className="pb-[100px] 2xl:pb-[84px] xl:pb-[78px] lg:pb-[70px]">
            <div className="relative aspect-[4/3] w-[520px] 4xl:w-[421px] 3xl:w-[389px] 2xl:w-[345px] xl:w-[276px] lg:w-[207px]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[50px] 3xl:rounded-[45px] 2xl:rounded-[45px] xl:rounded-[40px] lg:rounded-[35px] select-none pointer-events-none"
                />
                <div className="absolute right-[5%] top-[4%] aspect-[113/100] w-[114px] 4xl:w-[92px] 3xl:w-[85px] 2xl:w-[75px] xl:w-[60px] lg:w-[60px] rounded-[23px] 2xl:rounded-[20px] xl:rounded-[18px] lg:rounded-[16px] bg-white bg-opacity-80 flex flex-col justify-center items-center">
                    <p className="text-9xl  4xl:text-7xl 3xl:text-6xl 2xl:text-5xl xl:text-2xl lg:text-sm font-semibold text-[#1f203f]">
                        {day}
                    </p>
                    <p className="text-4xl  4xl:text-2xl 3xl:text-xl 2xl:text-lg xl:text-xs lg:text-xs font-medium text-[#878797]">
                        {month}
                    </p>
                </div>
            </div>
            <p className="uppercase font-medium text-white pt-5 line-clamp-2 leading-[1.2] max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis text-9xl 4xl:text-7xl 3xl:text-6xl 2xl:text-5xl xl:text-2xl lg:text-sm">
                {title}
            </p>
        </div>
    )
}
export default ItemEventsDesktop
