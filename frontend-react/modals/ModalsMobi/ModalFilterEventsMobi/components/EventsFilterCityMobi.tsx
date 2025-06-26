'use client'

import React from 'react'
import { ChevronLeftIconMobi } from '@/components/assets/iconsMobi'

interface Props {
    selectedCities: string[]
    onSelect: () => void
    onRemoveCity?: (city: string) => void
}

const EventsFilterCityMobi: React.FC<Props> = ({ selectedCities, onSelect, onRemoveCity }) => {
    return (
        <div className="mb-8 min-h-[120px]">
            <button
                type="button"
                onClick={onSelect}
                className="flex w-full items-center gap-2 rounded-xl px-0 py-2 text-left transition active:bg-[#222246]"
            >
                <span className="text18px_mobi font-semibold text-white">Город</span>
                <ChevronLeftIconMobi className="size-[14px] rotate-180 text-white" />
            </button>

            {selectedCities.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                    {selectedCities.map((city) => (
                        <button
                            key={city}
                            onClick={() => onRemoveCity?.(city)}
                            className="flex items-center justify-center rounded-full border border-white bg-[#353652] px-[14px] py-2 text-[14px] font-medium text-white transition-all duration-150 ease-in-out"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventsFilterCityMobi
