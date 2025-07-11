import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/pageMobi/HomePageMobi/components/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from './contentEventsSectionMobi/content'
const EventsSectionMobi: React.FC = () => {
    return (
        <section className="mx-auto flex flex-col px-[14px] py-[60px] align-middle">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/events" />
            <div className="scrollbar_custom flex max-w-full gap-8 overflow-x-scroll pt-9">
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
        </section>
    )
}
export default EventsSectionMobi
