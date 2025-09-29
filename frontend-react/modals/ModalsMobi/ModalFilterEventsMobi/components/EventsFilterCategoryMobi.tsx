'use client'

import React from 'react'

interface Props {
    selectedCategories: string[]
    onChange: (categories: string[]) => void
    categories: string[]
}

const EventsFilterCategoryMobi: React.FC<Props> = ({ selectedCategories, onChange, categories }) => {
    const toggleCategory = (cat: string) => {
        if (selectedCategories.includes(cat)) {
            onChange(selectedCategories.filter((c) => c !== cat))
        } else {
            onChange([...selectedCategories, cat])
        }
    }
    return (
        <div className="mb-8">
            <h3 className="text22px_mobi mb-4 font-semibold text-white">Категория мероприятия</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const selected = selectedCategories.includes(cat)
                    return (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`flex items-center justify-center rounded-full border border-transparent px-[14px] py-2 text-[14px] font-medium transition-all duration-150 ease-in-out
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
