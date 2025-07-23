import React, { useRef, useState, useEffect } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from './ItemEventsDesktop/ItemEventsDesktop'
import { contentEventsSection } from './contentEventsSectionDesktop/content'

const EventsSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollbarWidth, setScrollbarWidth] = useState(0)

    const calculateScrollbarWidth = () => {
        if (!contentRef.current || !scrollbarRef.current) return 0
        return contentRef.current.scrollWidth - (contentRef.current.offsetWidth - scrollbarRef.current.offsetWidth)
    }

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll: () => void = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current && scrollbarRef.current) {
                const calculatedScrollbarWidth = calculateScrollbarWidth()
                setScrollbarWidth(calculatedScrollbarWidth)
            }
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const scrollbar = scrollbarRef.current
        if (!scrollbar) return
        const timer = setInterval(() => {
            scrollbar.scrollLeft += 1
            scrollbar.scrollLeft -= 1
        }, 1000)
        return () => clearInterval(timer)
    }, [])

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
                className="scrollbar_custom mx-auto mt-[58px] w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div className="h-2 min-w-[1000px] bg-transparent" style={{ width: `${scrollbarWidth}px` }} />
            </div>
        </div>
    )
}

export default EventsSectionDesktop
