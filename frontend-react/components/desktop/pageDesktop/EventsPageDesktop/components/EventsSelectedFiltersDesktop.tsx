'use client'

import React from 'react'
import { CloseIconDesktop } from '@/components/assets/iconsDesktop'

interface IEventsSelectedFilters {
    selectedCategories: string[]
    onChangeSelectedCategories: (categories: string[]) => void
    dates: { from: Date | null; to: Date | null }
    onChangeSelectedDates: (dates: { from: Date | null; to: Date | null }) => void
    selectedCity: string | null
    onChangeSelectedCity: (city: string | null) => void
    categoryLabelBySlug: Record<string, string>
    cityLabelBySlug: Record<string, string>
}

const EventsSelectedFiltersDesktop: React.FC<IEventsSelectedFilters> = ({
    selectedCategories,
    onChangeSelectedCategories,
    dates,
    onChangeSelectedDates,
    selectedCity,
    onChangeSelectedCity,
    categoryLabelBySlug,
    cityLabelBySlug,
}) => {
    const hasAny = selectedCategories.length > 0 || (dates.from !== null && dates.to !== null) || selectedCity !== null

    if (!hasAny) return <div className="mt-[30px]" />

    return (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-[39px] mb-[30px]">
            {selectedCategories.map((slug) => (
                <div
                    key={slug}
                    className="flex items-center rounded-[50px] bg-[#ffffff1a] py-4 pl-[45px] pr-[45px] text-white"
                >
                    <span className="font-semibold text-5xl">{categoryLabelBySlug[slug]}</span>
                    <button
                        onClick={() => onChangeSelectedCategories(selectedCategories.filter((categorySlug) => categorySlug !== slug))}
                        className="ml-10 flex items-center justify-center"
                    >
                        <CloseIconDesktop className="h-3 w-3" />
                    </button>
                </div>
            ))}

            {dates.from && dates.to && (
                <div className="flex items-center rounded-[50px] bg-[#ffffff1a] py-4 pl-[45px] pr-[45px] text-white">
                    <span className="font-semibold text-5xl">
                        {`${dates.from.toLocaleDateString('ru-RU')} — ${dates.to.toLocaleDateString('ru-RU')}`}
                    </span>
                    <button
                        onClick={() => onChangeSelectedDates({ from: null, to: null })}
                        className="ml-10 flex items-center justify-center"
                    >
                        <CloseIconDesktop className="h-3 w-3" />
                    </button>
                </div>
            )}

            {selectedCity && (
                <div className="flex items-center rounded-[50px] bg-[#ffffff1a] py-4 pl-[45px] pr-[45px] text-white">
                    <span className="font-semibold text-5xl">{cityLabelBySlug[selectedCity]}</span>
                    <button onClick={() => onChangeSelectedCity(null)} className="ml-10 flex items-center justify-center">
                        <CloseIconDesktop className="h-3 w-3" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default EventsSelectedFiltersDesktop