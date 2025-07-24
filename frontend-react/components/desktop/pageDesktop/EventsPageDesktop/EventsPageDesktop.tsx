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
import { content } from './contentEventsPageDesktop/content'

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number)
    return new Date(year, month - 1, day)
}

const cardsPerPage = 6

const categoryValueBySlug: Record<string, string> = {
    fairs: 'выставка',
    open_days: 'дни открытых дверей',
    conferences: 'конференции',
    master_classes: 'мастер‑классы/семинары/тренинги',
    internships: 'стажировки',
    job_fairs: 'ярмарки вакансий',
}

const categoryLabelBySlug: Record<string, string> = {
    fairs: 'Выставки/презентации',
    open_days: 'Дни открытых дверей',
    conferences: 'Конференции',
    master_classes: 'Мастер‑классы/семинары/тренинги',
    internships: 'Стажировки',
    job_fairs: 'Ярмарки вакансий',
}

const cityValueBySlug: Record<string, string> = {
    minsk: 'Минск',
    brest: 'Брест',
    vitebsk: 'Витебск',
    gomel: 'Гомель',
    grodno: 'Гродно',
    mogilev: 'Могилев',
}

const cityLabelBySlug: Record<string, string> = {
    minsk: 'Минск',
    brest: 'Брест',
    vitebsk: 'Витебск',
    gomel: 'Гомель',
    grodno: 'Гродно',
    mogilev: 'Могилев',
}

const EventsPageDesktop: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredContent, setFilteredContent] = useState(content)

    const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState<string | null>(null)

    useEffect(() => {
        const { from, to } = dates

        const result = content
            .filter((item) => {
                const d = parseDate(item.date)
                if (from && d < from) return false
                if (to && d > to) return false
                return true
            })
            .filter((item) =>
                selectedCategories.length === 0
                    ? true
                    : selectedCategories.some((slug) => categoryValueBySlug[slug] === item.category),
            )
            .filter((item) => (!selectedCity ? true : cityValueBySlug[selectedCity] === item.city))

        setFilteredContent(result)
        setCurrentPage(1)
    }, [dates, selectedCategories, selectedCity]) 

    const isEmpty = filteredContent.length === 0
    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const paginated = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handlePageChange = (page: number) => setCurrentPage(page)

    return (
        <>
            <HeaderDesktop />

            <main className="bg-[#101030] text-white">
                <div className="container relative min-h-screen overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px] 3xl:p-[76px_130px_150px_130px]">
                    <h1 className="title80px_desktop relative z-[1]">Мероприятия</h1>

                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pt-[116px]">
                        <EventsSelectSearchDesktop selected={selectedCategories} onChange={setSelectedCategories} />
                        <EventsSelectSearchDateDesktop dates={dates} setDates={setDates} />
                        <EventsSelectSearchCityDesktop selected={selectedCity} onChange={setSelectedCity} />
                    </div>

                    <EventsSelectedFiltersDesktop
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        dates={dates}
                        setDates={setDates}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        categoryLabelBySlug={categoryLabelBySlug}
                        cityLabelBySlug={cityLabelBySlug}
                    />

                    <div className="flex min-h-[40vh] flex-wrap justify-center gap-9 2xl:gap-5 3xl:gap-[25px] 4xl:gap-[30px]">
                        {!isEmpty ? (
                            paginated.map((item) => <EventsCardDesktop key={item.id} {...item} />)
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-[113px] text-center">
                                <p className="text-7xl font-medium leading-10 text-[#353652] mb-6 text-center">
                                    Нет мероприятий по данным фильтрам
                                </p>
                                {(selectedCategories.length > 0 || selectedCity || dates.from || dates.to) && (
                                    <Button
                                        variant="select_btn_desktop"
                                        size="select_btn_desktop_events"
                                        className="px-[30px]"
                                        onClick={() => {
                                            setSelectedCategories([])
                                            setSelectedCity(null) 
                                            setDates({ from: null, to: null })
                                        }}
                                    >
                                        Сбросить фильтры
                                    </Button>
                                )}
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