import React from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import ItemEventsDesktop from '@/components/desktop/layout/EventsSectionDesktop/ItemEventsDesktop/ItemEventsDesktop'
import { content } from '@/components/desktop/layout/EventsSectionDesktop/content'
const EventsSectionDesktop: React.FC = () => {
    return (
        <div className="pb-[100px] pt-[23px]">
            <TitleDesktop title={'МЕРОПРИЯТИЯ'} />
            <div className="ml-[47px]  flex gap-[34px] overflow-x-auto scrollbar_custom">
                {content.map((item) => (
                    <ItemEventsDesktop image={item.image} title={item.title} date={item.date} key={item.id} />
                ))}
            </div>
        </div>
    )
}
export default EventsSectionDesktop
