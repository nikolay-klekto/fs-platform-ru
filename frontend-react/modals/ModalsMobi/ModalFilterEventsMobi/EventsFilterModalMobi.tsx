'use client'

import React, { useEffect, useRef, useState } from 'react'
import EventsFilterCategoryMobi from './components/EventsFilterCategoryMobi'
import EventsFilterDateMobi from './components/EventsFilterDateMobi'
import EventsFilterCityMobi from './components/EventsFilterCityMobi'
import EventsSearchCityMobi from './components/EventsSearchCityMobi'
import { GradientButtonMobi } from '@/components/mobi/shared/GradientButtonMobi'

interface Props {
    onClose: () => void
    filters: {
        categories: string[]
        dates: string[]
        cities: string[]
        dateScope: string
    }
    onApply: (filters: { categories: string[]; dates: string[]; cities: string[]; dateScope: string }) => void
    categories: string[]
    cities: string[]
}

const EventsFilterModalMobi: React.FC<Props> = ({ onClose, filters, onApply, cities, categories }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categories)
    const [shortDates, setShortDates] = useState<string[]>(filters.dates)
    const [selectedCities, setSelectedCities] = useState<string[]>(filters.cities)

    const [cityModalOpen, setCityModalOpen] = useState(false)
    const [scope, setScope] = useState<string | null>(null)

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    useEffect(() => {
        setSelectedCategories(filters.categories)
        setShortDates(filters.dates)
        setSelectedCities(filters.cities)
    }, [filters])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }
    const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClose()
        }
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleBackdropClick}
            onKeyDown={handleBackdropKeyDown}
            className="fixed inset-0 z-[1] flex flex-col bg-black/70 "
        >
            <div
                ref={modalRef}
                className="relative mt-auto max-h-[90vh] w-full overflow-y-auto rounded-t-[40px] bg-[#101030] px-[14px] pb-10 text-white"
            >
                <div className="mx-auto mb-2 flex h-[20px] w-full touch-none items-center justify-center pt-[24px]">
                    <div className="mx-auto mb-4 h-[4px] w-[40px] rounded-full bg-[#353652]" />{' '}
                </div>

                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-[20px] font-semibold">Фильтр</h2>
                    <button
                        className="text-[12px] font-medium text-[#878797] underline"
                        onClick={() => {
                            setSelectedCategories([])
                            setScope('')
                            setShortDates([])
                            setSelectedCities([])
                            onApply({
                                categories: [],
                                dates: [],
                                cities: [],
                                dateScope: '',
                            })
                        }}
                    >
                        Очистить
                    </button>
                </div>

                <EventsFilterCategoryMobi
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                    categories={categories}
                />
                <EventsFilterDateMobi
                    shortDates={shortDates}
                    onShortDatesChange={setShortDates}
                    scope={scope}
                    onScopeChange={setScope}
                />
                <EventsFilterCityMobi
                    selectedCities={selectedCities}
                    onSelect={() => setCityModalOpen(true)}
                    onRemoveCity={(city) => setSelectedCities(selectedCities.filter((c) => c !== city))}
                />

                {cityModalOpen && (
                    <EventsSearchCityMobi
                        selectedCities={selectedCities}
                        onChange={setSelectedCities}
                        onClear={() => setSelectedCities([])}
                        onClose={() => setCityModalOpen(false)}
                        cities={cities}
                    />
                )}
                <div className="flex justify-center">
                    <GradientButtonMobi
                        onClick={() => {
                            onApply({
                                categories: selectedCategories,
                                dates: shortDates,
                                cities: selectedCities,
                                dateScope: scope || '',
                            })
                            console.log(shortDates)
                            onClose()
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default EventsFilterModalMobi
