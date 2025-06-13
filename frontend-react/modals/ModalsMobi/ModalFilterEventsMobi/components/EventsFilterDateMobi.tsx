'use client'

import React from 'react'

interface Props {
    shortDates: string[]
    onShortDatesChange: (arr: string[]) => void
    scope: string | null
    onScopeChange: (scope: string | null) => void
}

const shortDateOptions = ['Сегодня', 'Завтра']
const scopeOptions = ['Эта неделя', 'В этом месяце', 'Ближайшие 3 месяца']

const EventsFilterDateMobi: React.FC<Props> = ({ shortDates, onShortDatesChange, scope, onScopeChange }) => {
    const handleShortDateClick = (option: string) => {
        if (scope) onScopeChange(null)
        if (shortDates.includes(option)) {
            onShortDatesChange(shortDates.filter((d) => d !== option))
        } else {
            onShortDatesChange([...shortDates, option])
        }
    }

    const handleScopeClick = (option: string) => {
        onScopeChange(option)
        onShortDatesChange([])
    }

    return (
        <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-semibold text-white">Дата</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {shortDateOptions.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleShortDateClick(option)}
                        className={`flex items-center justify-center rounded-full border border-transparent px-[14px] py-2 text-[14px] font-medium transition-all duration-150 ease-in-out
                        ${shortDates.includes(option) ? 'border border-white bg-[#353652] text-white' : 'bg-[#1F203F] text-[#878797]'}`}
                    >
                        {option}
                    </button>
                ))}
                {scopeOptions.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleScopeClick(option)}
                        className={`flex items-center justify-center rounded-full border border-transparent px-[14px] py-2 text-[14px] font-medium transition-all duration-150 ease-in-out
                        ${scope === option ? 'border border-white bg-[#353652] text-white' : 'bg-[#1F203F] text-[#878797]'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default EventsFilterDateMobi
