'use client'

import React from 'react'
import EventsFilterChipDesktop from './EventsFilterChipDesktop'

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
                <EventsFilterChipDesktop
                    key={slug}
                    label={categoryLabelBySlug[slug]}
                    onRemove={() =>
                        onChangeSelectedCategories(selectedCategories.filter((categorySlug) => categorySlug !== slug))
                    }
                />
            ))}

            {dates.from && dates.to && (
                <EventsFilterChipDesktop
                    label={`${dates.from.toLocaleDateString('ru-RU')} — ${dates.to.toLocaleDateString('ru-RU')}`}
                    onRemove={() => onChangeSelectedDates({ from: null, to: null })}
                />
            )}

            {selectedCity && (
                <EventsFilterChipDesktop label={cityLabelBySlug[selectedCity]} onRemove={() => onChangeSelectedCity(null)} />
            )}
        </div>
    )
}

export default EventsSelectedFiltersDesktop
