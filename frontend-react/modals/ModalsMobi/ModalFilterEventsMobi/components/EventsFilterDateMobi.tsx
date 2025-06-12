'use client'

import React from 'react'

interface Props {
    selected: string
    onChange: (val: string) => void
}

const dateOptions = ['Сегодня', 'Завтра', 'Эта неделя', 'В этом месяце', 'Ближайшие 3 месяца']

const EventsFilterDateMobi: React.FC<Props> = ({ selected, onChange }) => {
    return (
        <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-semibold text-white">Дата</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {dateOptions.map((option) => {
                    const isSelected = selected === option
                    return (
                        <button
                            key={option}
                            onClick={() => onChange(option)}
                            className={`flex items-center justify-center rounded-full border border-transparent px-[14px] py-2 text-[14px] font-medium transition-all duration-150 ease-in-out
                ${isSelected ? 'border border-white bg-[#353652] text-white' : 'bg-[#1F203F] text-[#878797]'}`}
                        >
                            {option}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default EventsFilterDateMobi
