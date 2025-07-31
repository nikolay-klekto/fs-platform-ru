'use client'

import React from 'react'
import EventsFilterChipDesktop from './EventsFilterChipDesktop'

interface IEventsSelectedFilters {
    selectedCategories: string[]
    onChangeSelectedCategories: (categories: string[]) => void
    selectedDates: Array<{ from: Date; to: Date }>
    onChangeSelectedDates: (dates: Array<{ from: Date; to: Date }>) => void
    selectedCities: string[]
    onChangeSelectedCities: (city: string[]) => void
    categoryLabelBySlug: Record<string, string>
    cityLabelBySlug: Record<string, string>
}

const EventsSelectedFiltersDesktop: React.FC<IEventsSelectedFilters> = ({
    selectedCategories,
    onChangeSelectedCategories,
    selectedDates,
    onChangeSelectedDates,
    selectedCities,
    onChangeSelectedCities,
    categoryLabelBySlug,
    cityLabelBySlug,
}) => {
    const hasActiveFilters = selectedCategories.length > 0 || selectedDates.length > 0 || selectedCities.length > 0

    if (!hasActiveFilters) return <div className="mt-[39px]" />

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

            {selectedDates.map((range) => (
                <EventsFilterChipDesktop
                    key={`${range.from.toISOString()}-${range.to.toISOString()}`}
                    label={`${range.from.toLocaleDateString('ru-RU')} — ${range.to.toLocaleDateString('ru-RU')}`}
                    onRemove={() => onChangeSelectedDates(selectedDates.filter((selectedRange) => selectedRange !== range))}
                />
            ))}

            {selectedCities.map((citySlug) => (
                <EventsFilterChipDesktop
                    key={citySlug}
                    label={cityLabelBySlug[citySlug]}
                    onRemove={() => onChangeSelectedCities(selectedCities.filter((slug) => slug !== citySlug))}
                />
            ))}
        </div>
    )
}

export default EventsSelectedFiltersDesktop
