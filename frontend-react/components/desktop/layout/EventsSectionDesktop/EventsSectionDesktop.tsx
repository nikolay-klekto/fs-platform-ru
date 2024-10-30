import React, { useRef } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from '@/components/desktop/layout/EventsSectionDesktop/ItemEventsDesktop/ItemEventsDesktop'
import { content } from '@/components/desktop/layout/EventsSectionDesktop/content'
const EventsSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)

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
    return (
        <div className="pb-[100px] pt-[23px]">
            <TitleDesktop title={'МЕРОПРИЯТИЯ'} />
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="ml-[47px]  flex gap-[34px] overflow-x-scroll no-scrollbar_custom"
            >
                {content.map((item) => (
                    <ItemEventsDesktop image={item.image} title={item.title} date={item.date} key={item.id} />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="h-2 w-[60%] mx-auto overflow-x-scroll scrollbar_custom"
            >
                <div className="w-[250%] h-full"></div>
            </div>
        </div>
    )
}
export default EventsSectionDesktop
