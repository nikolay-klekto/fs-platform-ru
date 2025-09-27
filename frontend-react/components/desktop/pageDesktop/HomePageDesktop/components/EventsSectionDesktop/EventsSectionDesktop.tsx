'use client'

import React, { useRef } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from './ItemEventsDesktop/ItemEventsDesktop'
import { contentEventsSection } from './contentEventsSectionDesktop/content'
import useScrollbarSync from '@/hooks/useScrollbarSync'
import { useDataContext } from '@/context/DataContext'

const SHOW_BACKEND_EVENTS = true
const EVENTS_TO_SHOW_COUNT = 6

export const MONTHS = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
]

function parseEventDate(dateStr: string): Date | null {
    const iso = new Date(dateStr)
    if (!isNaN(iso.getTime())) return iso

    const [dayRaw, monthRaw] = dateStr.split(' ')
    const day = Number(dayRaw)
    const monthIndex = MONTHS.findIndex((m) => m.toLowerCase() === (monthRaw ?? '').toLowerCase())
    if (!isNaN(day) && monthIndex >= 0) {
        const year = new Date().getFullYear()
        return new Date(year, monthIndex, day)
    }
    return null
}

const EventsSectionDesktop: React.FC = () => {
    const { events } = useDataContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    const eventSource = SHOW_BACKEND_EVENTS && events && events.length > 0 ? events : contentEventsSection

    const sortedEvents = eventSource.slice().sort((a, b) => {
        const dateA = parseEventDate(a.date)
        const dateB = parseEventDate(b.date)
        if (!dateA || !dateB) return 0
        return dateB.getTime() - dateA.getTime()
    })

    const eventsToShow = sortedEvents.slice(0, EVENTS_TO_SHOW_COUNT)

    return (
        <div className="py-[10vh]">
            <div className="container">
                <TitleDesktop title={'Мероприятия'} href="/events" />
            </div>
            <div
                ref={contentRef}
                className="no-scrollbar_custom container mt-[6vh] flex select-none gap-8 overflow-x-scroll"
            >
                {eventsToShow.map((item) => (
                    <ItemEventsDesktop image={item.imagePath} title={item.name} date={item.date} key={item.id} />
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
