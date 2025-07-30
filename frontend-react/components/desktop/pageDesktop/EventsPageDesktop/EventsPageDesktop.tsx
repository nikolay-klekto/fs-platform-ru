'use client'

import React, { useState, useEffect } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import EventsCardDesktop from './components/EventsCardDesktop'
import EventsPaginationDesktop from './components/EventsPaginationDesktop'
import EventsSelectSearchDesktop from './components/EventsSelectSearchDesktop'
import EventsSelectSearchDateDesktop from './components/EventsSelectSearchDateDesktop'
import EventsSelectSearchCityDesktop from './components/EventsSelectSearchCityDesktop'
import EventsSelectedFiltersDesktop from './components/EventsSelectedFiltersDesktop'
import { Button } from '@/components/ui/button'
import { content, IContent, categoryLabelBySlug, cityLabelBySlug } from './contentEventsPageDesktop/content'

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number)
    return new Date(year, month - 1, day)
}

const cardsPerPage = 6

const EventsPageDesktop: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredContent, setFilteredContent] = useState<IContent[]>(content)

    const [selectedDates, setSelectedDates] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState<string | null>(null)

    const resetFilters = () => {
        setSelectedCategories([])
        setSelectedCity(null)
        setSelectedDates({ from: null, to: null })
    }

    useEffect(() => {
        const filteredEvents = content
            .filter((item) =>
                selectedCategories.length === 0
                    ? true
                    : selectedCategories.some(
                          (slug) => categoryLabelBySlug[slug].toLowerCase() === item.category.toLowerCase(),
                      ),
            )
            .filter((item) => {
                const date = parseDate(item.date)
                if (selectedDates.from && date < selectedDates.from) return false
                if (selectedDates.to && date > selectedDates.to) return false
                return true
            })
            .filter((item) =>
                !selectedCity ? true : cityLabelBySlug[selectedCity].toLowerCase() === item.city.toLowerCase(),
            )

        setFilteredContent(filteredEvents)
        setCurrentPage(1)
    }, [selectedDates, selectedCategories, selectedCity])

    const isEmpty = filteredContent.length === 0
    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const pagedEvents = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handlePageChange = (page: number) => setCurrentPage(page)

    const isShortRow = pagedEvents.length < 3

    return (
        <>
            <HeaderDesktop />

            <main className="bg-[#101030] text-white">
                <div className="3xl:p-[76px_130px_150px_130px] container relative min-h-screen overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                    <h1 className="title80px_desktop relative z-[1]">Мероприятия</h1>

                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pb-[30px] pt-[116px]">
                        <EventsSelectSearchDesktop
                            selectedOptions={selectedCategories}
                            onChange={setSelectedCategories}
                        />
                        <EventsSelectSearchDateDesktop dates={selectedDates} onChange={setSelectedDates} />
                        <EventsSelectSearchCityDesktop selectedCity={selectedCity} onChangeCity={setSelectedCity} />
                    </div>

                    <EventsSelectedFiltersDesktop
                        selectedCategories={selectedCategories}
                        onChangeSelectedCategories={setSelectedCategories}
                        selectedDates={selectedDates}
                        onChangeSelectedDates={setSelectedDates}
                        selectedCity={selectedCity}
                        onChangeSelectedCity={setSelectedCity}
                        categoryLabelBySlug={categoryLabelBySlug}
                        cityLabelBySlug={cityLabelBySlug}
                    />

                    <div className={`flex flex-col w-full ${isEmpty ? 'gap-[17px]' : 'gap-[73px]'}`}>
                        {isEmpty ? (
                            <div className="flex flex-col items-center justify-items-center justify-center pt-[113px] text-center">
                                <p className="text-7xl font-medium leading-10 text-[#353652]">
                                    Нет мероприятий по данным категориям
                                </p>
                            </div>
                        ) : (
                            <div className="3xl:gap-[25px] 4xl:gap-[30px] flex min-h-[40vh] flex-wrap justify-center gap-[36px] 2xl:gap-[20px]">
                                {pagedEvents.map((item) => (
                                    <EventsCardDesktop key={item.id} {...item} />
                                ))}
                            </div>
                        )}

                        {(selectedCategories.length > 0 || selectedCity || selectedDates.from || selectedDates.to) && (
                            <div className="flex justify-center w-full mt-4">
                                <Button
                                    variant="select_btn_desktop"
                                    size="select_btn_desktop_events"
                                    onClick={resetFilters}
                                >
                                    Сбросить фильтры
                                </Button>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <EventsPaginationDesktop
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </main>

            <FooterDesktop />
        </>
    )
}

export default EventsPageDesktop
