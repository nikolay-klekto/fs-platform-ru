import React, { useRef, useState } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from '@/components/desktop/layout/EventsSectionDesktop/ItemEventsDesktop/ItemEventsDesktop'
import { content } from '@/components/desktop/layout/EventsSectionDesktop/content'
const EventsSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    const scrollbarWidth = `${((content.length * itemWidth) / window.innerWidth) * 150}%`

    return (
        <div className="container p-no-right-padding w-full py-[10vh]">
            <TitleDesktop title={'МЕРОПРИЯТИЯ'} href="/profevents" />
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="mt-[10vh] flex justify-start gap-8 w-full overflow-x-scroll no-scrollbar_custom select-none"
            >
                {content.map((item) => (
                    <ItemEventsDesktop
                        image={item.image}
                        title={item.title}
                        date={item.date}
                        key={item.id}
                        onWidthChange={setItemWidth}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="h-2 w-[60%] mx-auto mt-[8vh] overflow-x-scroll scrollbar_custom cursor-pointer"
            >
                <div className="h-full" style={{ width: scrollbarWidth }}></div>
            </div>
        </div>
    )
}
export default EventsSectionDesktop
