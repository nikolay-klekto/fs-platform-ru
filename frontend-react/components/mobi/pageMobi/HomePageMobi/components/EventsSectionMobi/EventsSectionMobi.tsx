'use client'

import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/pageMobi/HomePageMobi/components/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from './contentEventsSectionMobi/content'
const EventsSectionMobi: React.FC = () => {
    return (
        <section className="flex w-full flex-col px-[15px] pb-[60px] pt-[80px] md:px-[32px]">
            <TitleMobi title={'Мероприятия'} href="/events" />
            <div className="scrollbar_custom flex max-w-full gap-8 overflow-x-scroll pt-8">
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
        </section>
    )
}
export default EventsSectionMobi
