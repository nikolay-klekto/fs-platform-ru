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
        <section className="mx-auto flex flex-col px-[14px] py-[60px] align-middle">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/events" />
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex max-w-full gap-8 overflow-x-scroll pt-9">
                {content.map((item) => (
                    <ItemEventsMobi
                        image={item.image}
                        title={item.title}
                        date={item.date}
                        key={item.id}
                        adress={item.adress}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                className="scrollbar_custom mx-auto relative h-2 w-[97%] overflow-x-scroll sm_s:mb-[60px] md:mt-12 md:mb-[125px]"
            >
                <div className="h-full" style={{ width: `${scrollContentWidth}px` }}></div>
            </div>
        </section>
    )
}
export default EventsSectionMobi
