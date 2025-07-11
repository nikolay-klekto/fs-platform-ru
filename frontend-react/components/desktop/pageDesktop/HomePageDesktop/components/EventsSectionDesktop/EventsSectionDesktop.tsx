import React, { useRef, useState, useEffect } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from './ItemEventsDesktop/ItemEventsDesktop'
import { contentEventsSection } from './contentEventsSectionDesktop/content'

const EventsSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = useState<number>(0)
    const [visibleWidth, setVisibleWidth] = useState<number>(0)

    useEffect(() => {
        const updateSizes = () => {
            if (contentRef.current) {
                setContentWidth(contentRef.current.scrollWidth)
                setVisibleWidth(contentRef.current.clientWidth)
            }
        }

        updateSizes()
        window.addEventListener('resize', updateSizes)

        return () => {
            window.removeEventListener('resize', updateSizes)
        }
    }, [contentEventsSection])

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            const scrollRatio =
                contentRef.current.scrollLeft / (contentRef.current.scrollWidth - contentRef.current.clientWidth)
            const scrollbarScrollLeft =
                scrollRatio * (scrollbarRef.current.scrollWidth - scrollbarRef.current.clientWidth)
            scrollbarRef.current.scrollLeft = scrollbarScrollLeft
        }
    }

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            const scrollRatio =
                scrollbarRef.current.scrollLeft / (scrollbarRef.current.scrollWidth - scrollbarRef.current.clientWidth)
            const contentScrollLeft = scrollRatio * (contentRef.current.scrollWidth - contentRef.current.clientWidth)
            contentRef.current.scrollLeft = contentScrollLeft
        }
    }

    const scrollbarWidth = contentWidth > visibleWidth ? `${(contentWidth / visibleWidth) * 100}%` : '100%'

    return (
        <div className="py-[10vh]">
            <div className="container">
                <TitleDesktop title={'МЕРОПРИЯТИЯ'} href="/events" />
            </div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom container mt-[6vh] flex select-none gap-8 overflow-x-scroll"
            >
                {contentEventsSection.map((item) => (
                    <ItemEventsDesktop image={item.image} title={item.title} date={item.date} key={item.id} />
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
