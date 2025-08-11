'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIconDesktop, SearchIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { cityOptions } from '../contentEventsPageDesktop/content'

interface IEventsSelectSearchCity {
    selectedCities: string[]
    onChange: (city: string[]) => void
}

const EventsSelectSearchCityDesktop: React.FC<IEventsSelectSearchCity> = ({ selectedCities, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filteredCities = cityOptions.filter((cityOption) =>
        cityOption.label.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleCitySelect = (cityValue: string) => {
        const isAlreadySelected = selectedCities.includes(cityValue)
        const nextSelected = isAlreadySelected
            ? selectedCities.filter((selectedCity) => selectedCity !== cityValue)
            : [...selectedCities, cityValue]
        onChange(nextSelected)
        setIsOpen(false)
    }

    return (
        <div className="relative z-[3]" ref={ref}>
            <Button
                variant="select_btn_desktop"
                size="select_btn_desktop_date"
                onClick={() => setIsOpen((v) => !v)}
                className={isOpen ? 'bg-gradient-desktop' : 'bg-[#101030]'}
            >
                Город
                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {isOpen && (
                <div className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[400px] rounded-[42px] p-[2px] 2xl:w-[270px] bg-gradient-desktop">
                    <div className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        <div className="border-white-300 flex items-center rounded-[50px] border px-3">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-18px flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-gray-500"
                            />
                            <SearchIconDesktop className="mr-2 size-4 shrink-0 opacity-50" />
                        </div>
                        {filteredCities.map((cityOption) => (
                            <div
                                key={cityOption.value}
                                onClick={() => handleCitySelect(cityOption.value)}
                                role="menuitem"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleCitySelect(cityOption.value)
                                    }
                                }}
                                className={`hover:border-hover text-[18px] font-medium relative z-[3] flex cursor-pointer items-center justify-between p-[15px] text-white ${
                                    selectedCities.includes(cityOption.value)
                                        ? 'border-selected border-y-2 bg-[#28295B]'
                                        : 'bg-transparent'
                                }`}
                            >
                                <div className="pl-[14px]">{cityOption.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventsSelectSearchCityDesktop
