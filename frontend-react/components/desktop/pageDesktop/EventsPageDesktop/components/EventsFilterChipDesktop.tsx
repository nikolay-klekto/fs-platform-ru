import React from 'react'
import { CloseIconDesktop } from '@/components/assets/iconsDesktop'

interface EventsFilterChipDesktopProps{
    label: string
    onRemove: () => void
}

const EventsFilterChipDesktop: React.FC<EventsFilterChipDesktopProps> = ({ label, onRemove }) => {
    return (
        <div className="flex items-center rounded-[50px] bg-[#ffffff1a] py-4 pl-[45px] pr-[45px] text-white">
            <span className="font-semibold text-5xl">{label}</span>
            <button onClick={onRemove} className="ml-10 flex items-center justify-center">
                <CloseIconDesktop className="h-3 w-3" />
            </button>
        </div>
    )
}

export default EventsFilterChipDesktop