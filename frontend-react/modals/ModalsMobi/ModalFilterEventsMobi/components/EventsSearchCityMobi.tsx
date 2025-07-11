'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronDownIconMobi, SearchIconMobi } from '@/components/assets/iconsMobi'
import { GradientButtonMobi } from '@/components/mobi/shared/GradientButtonMobi'
import { useBackdropClose } from './useBackdropClose'

interface Props {
    selectedCities: string[]
    onChange: (cities: string[]) => void
    onClear: () => void
    onClose: () => void
    cities: string[]
}

const EventsSearchCityMobi: React.FC<Props> = ({ selectedCities, onChange, onClear, onClose, cities }) => {
    const [search, setSearch] = useState('')
    const [savedCities, setSavedCities] = useState(selectedCities)
    const scrollRef = useRef<HTMLDivElement>(null)

    const filteredCities = useMemo(() => {
        return cities.filter((city) => city.toLowerCase().startsWith(search.toLowerCase()))
    }, [search, cities])

    const favorites = useMemo(
        () => filteredCities.filter((city) => savedCities.includes(city)),
        [filteredCities, savedCities],
    )
    const rest = useMemo(
        () => filteredCities.filter((city) => !savedCities.includes(city)),
        [filteredCities, savedCities],
    )

    function toggleCity(city: string) {
        if (savedCities.includes(city)) {
            setSavedCities(savedCities.filter((c) => c !== city))
        } else {
            setSavedCities([...savedCities, city])
        }
    }

    function handleClear() {
        setSavedCities([])
        setSearch('')
        onClear()
    }

    useEffect(() => {
        setSavedCities(selectedCities)
    }, [selectedCities])

    const { modalRef, handleBackdropClick, handleBackdropKeyDown } = useBackdropClose(onClose)

    return (
        <div
            role="button"
            onClick={handleBackdropClick}
            onKeyDown={handleBackdropKeyDown}
            tabIndex={0}
            className="fixed inset-0 z-50 flex items-end"
        >
            <div
                ref={modalRef}
                className="relative flex h-[92vh] w-full max-w-full flex-col rounded-t-[40px] bg-[#101030]"
            >
                <div className="mx-auto mb-2 flex h-[20px] w-full touch-none items-center justify-center pt-[24px]">
                    <div className="mx-auto mb-4 h-[4px] w-[40px] rounded-full bg-[#353652]" />{' '}
                </div>

                <div className="flex items-center justify-between pb-6">
                    <div className="flex">
                        <button
                            className="mx-3 flex size-8 min-w-[32px] items-center justify-center"
                            onClick={onClose}
                            aria-label="Назад"
                        >
                            <ChevronDownIconMobi className="h-[12px] w-[24px] rotate-90 text-white" />
                        </button>
                        <div className="flex-1 text-center text-[20px] font-semibold text-white">Город</div>
                    </div>

                    <button
                        className="px-[16px] text-[13px] font-medium text-[#878797] underline"
                        style={{ minWidth: 60, textAlign: 'right' }}
                        onClick={handleClear}
                    >
                        Очистить
                    </button>
                </div>
                <div className="relative mx-4 mb-[18px] h-full rounded-[25px] bg-[#1F203F] p-2">
                    <div className="relative mx-1 mb-[14px] flex items-center rounded-[50px] border-2 border-[#878797] bg-transparent">
                        <input
                            className="flex w-full rounded-[50px] bg-transparent py-[16px] pl-[16px] pr-12 text-[14px] font-medium not-italic leading-[17px] text-[#FFFFFF] placeholder-[#353652] outline-none"
                            placeholder="Поиск"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute right-5">
                            <SearchIconMobi className="size-6 text-[#878797]" />
                        </span>
                    </div>
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto px-1"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            minHeight: 0,
                            maxHeight: 'calc(60vh - 100px)',
                        }}
                    >
                        <ul className="space-y-1">
                            {favorites.length > 0 && (
                                <>
                                    <li>
                                        <div className="select-none px-4 pb-[14px] pt-2 text-[13px] font-medium text-[#878797]">
                                            Выбранные
                                        </div>
                                    </li>
                                    {favorites.map((city) => (
                                        <li key={`fav-${city}`}>
                                            <button
                                                className="flex w-full items-center rounded-[16px] bg-[#23244a] p-4 text-[14px] font-medium text-white focus:outline-none"
                                                onClick={() => toggleCity(city)}
                                            >
                                                {city}
                                            </button>
                                        </li>
                                    ))}
                                </>
                            )}
                            {favorites.length > 0 && rest.length > 0 && (
                                <>
                                    <li>
                                        <div className="select-none px-4 pb-[14px] pt-4 text-[13px] font-medium text-[#878797]">
                                            Все города
                                        </div>
                                    </li>
                                </>
                            )}

                            {rest.length === 0 && favorites.length === 0 && (
                                <li>
                                    <div className="text22px_mobi px-4 py-6 text-center text-[#878797]">Не найдено</div>
                                </li>
                            )}
                            {rest.map((city, idx) => (
                                <li key={`rest-${city}`}>
                                    <button
                                        className={`flex w-full items-center rounded-[12px] bg-transparent p-4 text-[14px] font-medium ${
                                            savedCities.includes(city) ? 'bg-[#23244a] text-white' : 'text-white/90'
                                        } focus:outline-none`}
                                        onClick={() => toggleCity(city)}
                                    >
                                        {city}
                                    </button>
                                    {idx !== rest.length - 1 && <div className="mx-4 border-b border-[#353652]" />}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-4 pb-[23px]">
                        <GradientButtonMobi
                            onClick={() => {
                                onChange(savedCities)
                                onClose()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsSearchCityMobi
