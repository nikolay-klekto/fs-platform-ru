import React from 'react'
import { X } from 'lucide-react'

interface EventActiveFiltersProps {
    filters: { key: string; label: string; value: string | string[] }[]
    onRemove: (key: string) => void
}

const EventActiveFilters: React.FC<EventActiveFiltersProps> = ({ filters, onRemove }) => {
    if (filters.length === 0) return null

    return (
        <div className="active-filters-container flex flex-wrap items-center gap-10 px-[45px] py-4">
            {filters.map((filter) => {
                return (
                    <div
                        key={filter.key}
                        className="text20px_desktop text-white font-semibold rounded-full h-[56px] py-[16px] px-[45px] gap-[40px] bg-white/10 backdrop-blur-sm  flex items-center"
                    >
                        <span>{filter.label}</span>
                        <button
                            onClick={() => onRemove(filter.key)}
                            className="cursor-pointer p-1"
                            aria-label={`Remove ${filter.label}`}
                        >
                            <X size={24} color="#878797" />
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default EventActiveFilters
