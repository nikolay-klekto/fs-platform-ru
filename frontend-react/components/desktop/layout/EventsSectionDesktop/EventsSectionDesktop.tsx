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
        <div className="max-w-full py-[100px] lg:py-[70px] xl:py-[78px] 2xl:py-[84px]">
            <TitleDesktop title={'МЕРОПРИЯТИЯ'} href="/profevents" />
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom ml-[47px] mt-[80px] flex select-none gap-[34px] overflow-x-scroll lg:mt-[55px] xl:mt-[62px] 2xl:mt-[67px]"
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
                className="scrollbar_custom mx-auto h-2 w-3/5 cursor-pointer overflow-x-scroll"
            >
                <div className="h-full" style={{ width: scrollbarWidth }}></div>
            </div>
        </div>
    )
}
export default EventsSectionDesktop
