'use client'

import React, { useEffect, useRef, useState } from 'react'
import EventsFilterCategoryMobi from './components/EventsFilterCategoryMobi'
import EventsFilterDateMobi from './components/EventsFilterDateMobi'
import EventsFilterCityMobi from './components/EventsFilterCityMobi'
import EventsSearchCityMobi from './components/EventsSearchCityMobi'

interface Props {
    onClose: () => void
}

const EventsFilterModalMobi: React.FC<Props> = ({ onClose }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [shortDates, setShortDates] = useState<string[]>([])
    const [selectedCities, setSelectedCities] = useState<string[]>([])
    const [cityModalOpen, setCityModalOpen] = useState(false)
    const [scope, setScope] = useState<string | null>(null)

    const modalRef = useRef<HTMLDivElement>(null)
    const dragStartY = useRef<number | null>(null)

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    const handleTouchStart = (e: React.TouchEvent) => {
        dragStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (dragStartY.current === null) return
        const deltaY = e.touches[0].clientY - dragStartY.current
        if (deltaY > 0 && modalRef.current) {
            modalRef.current.style.transform = `translateY(${deltaY}px)`
        }
    }

    const handleTouchEnd = () => {
        if (!modalRef.current || dragStartY.current === null) return
        const currentY = parseFloat(modalRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0

        if (currentY > 80) {
            modalRef.current.style.transition = 'transform 0.2s ease-out'
            modalRef.current.style.transform = `translateY(100%)`
            setTimeout(() => {
                onClose()
            }, 200)
        } else {
            modalRef.current.style.transition = 'transform 0.2s ease-out'
            modalRef.current.style.transform = `translateY(0px)`
        }
        dragStartY.current = null
    }

    // useEffect(() => {
    //     if (cityModalOpen && modalRef.current) {
    //         modalRef.current.style.transform = 'translateY(0px)'
    //         modalRef.current.style.transition = ''
    //     }
    // }, [cityModalOpen])

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
                <div
                    className="mx-auto mb-2 flex h-[20px] w-full touch-none items-center justify-center pt-[24px]"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
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
                        }}
                    >
                        Очистить
                    </button>
                </div>

                <EventsFilterCategoryMobi selectedCategories={selectedCategories} onChange={setSelectedCategories} />
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
                    />
                )}

                {/* <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-[14px] font-medium text-white underline"
                >
                    Закрыть
                </button> */}
            </div>
        </div>
    )
}

export default EventsFilterModalMobi
