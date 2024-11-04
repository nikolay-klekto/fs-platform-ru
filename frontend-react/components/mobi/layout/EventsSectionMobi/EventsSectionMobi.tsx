import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/layout/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from '@/components/mobi/layout/EventsSectionMobi/content'
const EventsSectionDesktop: React.FC = () => {
    return (
        <div className="pb-[60px] pt-[60px] px-[14px] flex flex-col align-middle mx-auto">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/profevents" />
            <div className="flex gap-[34px] pt-[36px] overflow-x-scroll scrollbar_custom cursor-pointer">
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
export default EventsSectionDesktop
