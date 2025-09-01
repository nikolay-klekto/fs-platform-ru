'use client'

import { useRef } from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/pageMobi/HomePageMobi/components/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from './contentEventsSectionMobi/content'
import useScrollbarSync from '@/hooks/useScrollbarSync'
const EventsSectionMobi: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)
    return (
        <section className="flex w-full flex-col px-[15px] py-[60px] md:px-[32px]">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/events" />
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex max-w-full gap-8 overflow-x-scroll pt-8">
                {content.map((item) => (
                    <ItemEventsMobi
                        image={item.image}
                        title={item.title}
                        date={item.date}
                        key={item.id}
                        address={item.address}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                className="scrollbar_custom relative h-2 overflow-x-scroll "
            >
                <div className="h-full" style={{ width: `${scrollContentWidth}px` }}></div>
            </div>
        </section>
    )
}
export default EventsSectionMobi
