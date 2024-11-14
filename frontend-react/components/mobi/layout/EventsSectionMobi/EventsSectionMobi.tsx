import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ItemEventsMobi from '@/components/mobi/layout/EventsSectionMobi/ItemEventsMobi/ItemEventsMobi'
import { content } from '@/components/mobi/layout/EventsSectionMobi/content'
const EventsSectionDesktop: React.FC = () => {
    return (
        <div className="mx-auto flex flex-col px-[14px] py-[60px] align-middle">
            <TitleMobi title={'МЕРОПРИЯТИЯ'} href="/profevents" />
            <div className="scrollbar_custom flex cursor-pointer gap-[34px] overflow-x-scroll pt-[36px]">
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
