'use client'

import React from 'react'

interface Props {
    selectedCategory: string | null
    onSelect: (category: string) => void
}

const categories = [
    'Выставка/презентация',
    'Конференция',
    'Мастер-класс/семинар/тренинг',
    'Стажировка',
    'День открытых дверей',
    'Ярмарка вакансий',
]

const EventsFilterCategoryMobi: React.FC<Props> = ({ selectedCategory, onSelect }) => {
    return (
        <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-semibold text-white">Категория мероприятия</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const selected = selectedCategory === cat
                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            className={`flex items-center justify-center rounded-full px-4 py-2 text-[14px] font-medium
                ${selected ? 'border border-white bg-[#353652] text-white' : 'bg-[#1F203F] text-[#878797]'}`}
                        >
                            {cat}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default EventsFilterCategoryMobi
