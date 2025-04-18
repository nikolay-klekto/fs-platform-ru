import React, { useRef, useState } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from './ItemEventsDesktop/ItemEventsDesktop'
import { contentEventsSection } from './contentEventsSectionDesktop/content'
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

    const scrollbarWidth = `${((contentEventsSection.length * itemWidth) / window.innerWidth) * 150}%`

    return (
        <div className="p-no-right-padding container py-[10vh]">
            <TitleDesktop title={'МЕРОПРИЯТИЯ'} href="/events" />
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom container mt-[6vh] flex select-none gap-8 overflow-x-scroll"
            >
                {contentEventsSection.map((item) => (
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
                className="scrollbar_custom mx-auto mt-[8vh] h-2 w-3/5 cursor-pointer overflow-x-scroll"
            >
                <div className="h-full" style={{ width: scrollbarWidth }}></div>
            </div>
        </div>
    )
}
export default EventsSectionDesktop
