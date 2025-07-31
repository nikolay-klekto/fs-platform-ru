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

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedDates, setSelectedDates] = useState<Array<{ from: Date; to: Date }>>([])
    const [selectedCities, setSelectedCities] = useState<string[]>([])

    const resetFilters = () => {
        setSelectedCategories([])
        setSelectedCities([])
        setSelectedDates([])
    }

    useEffect(() => {
        const filteredEvents = content.filter((item) => {
            const isCategoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.some(
                    (slug) => categoryLabelBySlug[slug].toLowerCase() === item.category.toLowerCase(),
                )

            const date = parseDate(item.date)
            const isDateMatch =
                selectedDates.length === 0 || selectedDates.some(({ from, to }) => date >= from && date <= to)

            const isCityMatch =
                selectedCities.length === 0 ||
                selectedCities.map((slug) => cityLabelBySlug[slug].toLowerCase()).includes(item.city.toLowerCase())

            return isCategoryMatch && isDateMatch && isCityMatch
        })

        setFilteredContent(filteredEvents)
        setCurrentPage(1)
    }, [selectedDates, selectedCategories, selectedCities])

    const isEmpty = filteredContent.length === 0
    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const pagedEvents = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handlePageChange = (page: number) => setCurrentPage(page)

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
                        <EventsSelectSearchDateDesktop selectedDates={selectedDates} onChange={setSelectedDates} />
                        <EventsSelectSearchCityDesktop selectedCities={selectedCities} onChange={setSelectedCities} />
                    </div>

                    <EventsSelectedFiltersDesktop
                        selectedCategories={selectedCategories}
                        onChangeSelectedCategories={setSelectedCategories}
                        selectedDates={selectedDates}
                        onChangeSelectedDates={setSelectedDates}
                        selectedCities={selectedCities}
                        onChangeSelectedCities={setSelectedCities}
                        categoryLabelBySlug={categoryLabelBySlug}
                        cityLabelBySlug={cityLabelBySlug}
                    />

                    <div className={`flex flex-col w-full ${isEmpty ? 'gap-[17px]' : 'gap-[73px]'}`}>
                        {isEmpty ? (
                            <div className="flex flex-col items-center justify-center pt-[113px] text-center">
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

                        {(selectedCategories.length > 0 || selectedCities.length > 0 || selectedDates.length > 0) && (
                            <div className="flex justify-center w-full">
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
