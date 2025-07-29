import React from 'react'
import { CloseIconDesktop } from '@/components/assets/iconsDesktop'

interface IEventsFilterChipDesktop{
    label: string
    onRemove: () => void
}

const EventsFilterChipDesktop: React.FC<IEventsFilterChipDesktop> = ({ label, onRemove }) => {
    return (
        <div className="flex items-center rounded-[50px] bg-[#ffffff1a] py-4 pl-[45px] pr-[45px] 3xl:pl-[40px] 3xl:pr-[40px] 2xl:pl-[35px] 2xl:pr-[35px] text-white">
            <span className="font-semibold text-5xl 3xl:text-4xl 2xl:text-3xl">{label}</span>
            <button onClick={onRemove} className="ml-10 3xl:ml-8 2xl:ml-6 flex items-center justify-center">
                <CloseIconDesktop className="h-3 w-3" />
            </button>
        </div>
    )
}

export default EventsFilterChipDesktop