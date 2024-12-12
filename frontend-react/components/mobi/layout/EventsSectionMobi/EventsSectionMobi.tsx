import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/layout/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from '@/components/mobi/layout/EventsSectionMobi/content'
const EventsSectionMobi: React.FC = () => {
    return (
        <div className="px-[14px] py-[60px] flex flex-col align-middle mx-auto">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/profevents" />
            <div className="flex gap-8 pt-9 max-w-full overflow-x-scroll scrollbar_custom cursor-pointer">
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
        </div>
    )
}
export default EventsSectionMobi
