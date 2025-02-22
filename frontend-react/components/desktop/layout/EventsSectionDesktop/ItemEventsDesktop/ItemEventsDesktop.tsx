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
    }, [onWidthChange])

    return (
        <div ref={itemRef} className="flex min-w-[27%] max-w-[27%] flex-col">
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="pointer-events-none select-none rounded-[3.125rem] object-cover 2xl:rounded-[2rem]"
                />
                <div className="absolute right-[5%] top-[4%] flex aspect-[113/100] w-[22%] flex-col items-center justify-center rounded-3xl bg-white bg-opacity-[80%] 2xl:rounded-2xl">
                    <p className="4xl:text-7xl 3xl:text-6xl text-9xl font-semibold text-[#1f203f] 2xl:text-4xl">
                        {day}
                    </p>
                    <p className="4xl:text-2xl 3xl:text-xl text-4xl  font-medium text-[#878797] 2xl:text-lg">{month}</p>
                </div>
            </div>
            <p className="4xl:text-7xl 3xl:text-6xl line-clamp-2 max-h-[calc(2*2.5rem)] overflow-hidden text-ellipsis pt-5 text-9xl font-medium uppercase leading-[1.2] text-white 2xl:text-4xl">
                {title}
            </p>
        </div>
    )
}
export default ItemEventsDesktop
