'use client'

import React, { useRef } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from './ItemEventsDesktop/ItemEventsDesktop'
import { contentEventsSection } from './contentEventsSectionDesktop/content'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const EventsSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <div className="py-[10vh]">
            <div className="container">
                <TitleDesktop title={'Мероприятия'} href="/events" />
            </div>
            <div
                ref={contentRef}
                className="no-scrollbar_custom container mt-[6vh] flex select-none gap-8 overflow-x-scroll"
            >
                {contentEventsSection.map((item) => (
                    <ItemEventsDesktop image={item.image} title={item.title} date={item.date} key={item.id} />
                ))}
            </div>
            <div className="container mt-[58px]">
                <div
                    ref={scrollbarRef}
                    className="scrollbar_custom mx-auto mt-[58px] w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div className="h-2 bg-transparent" style={{ width: `${scrollContentWidth}px` }} />
                </div>
            </div>
        </div>
    )
}

export default EventsSectionDesktop
