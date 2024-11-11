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
        <div ref={itemRef}>
            <div className="relative aspect-[4/3] w-[520px] 4xl:w-[421px] 3xl:w-[389px] 2xl:w-[345px]">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="object-cover rounded-[3.125rem] 2xl:rounded-[2rem] select-none pointer-events-none"
                />
                <div className="absolute right-[5%] top-[4%] flex flex-col justify-center items-center aspect-[113/100] w-[22%] rounded-[1.5rem] 2xl:rounded-[1rem] bg-white bg-opacity-80">
                    <p className="font-semibold text-[#1f203f] text-9xl 4xl:text-7xl 3xl:text-6xl 2xl:text-4xl">
                        {day}
                    </p>
                    <p className="font-medium text-[#878797] text-4xl  4xl:text-2xl 3xl:text-xl 2xl:text-lg">{month}</p>
                </div>
            </div>
            <p className="uppercase font-medium text-white pt-5 line-clamp-2 leading-[1.2] max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis text-9xl 4xl:text-7xl 3xl:text-6xl 2xl:text-4xl">
                {title}
            </p>
        </div>
    )
}
export default ItemEventsDesktop
