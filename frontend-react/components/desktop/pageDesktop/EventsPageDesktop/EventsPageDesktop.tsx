'use client'

import React, { useState, useEffect } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import EventsCardDesktop from './components/EventsCardDesktop'
import EventsPaginationDesktop from './components/EventsPaginationDesktop'
import EventsSelectSearchDesktop from './components/EventsSelectSearchDesktop'
import EventsSelectSearchDateDesktop from './components/EventsSelectSearchDateDesktop'
import EventsSelectSearchCityDesktop from './components/EventsSelectSearchCityDesktop'
import { content } from './contentEventsPageDesktop/content'

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number)
    return new Date(year, month - 1, day)
}

const cardsPerPage = 6

interface ISelectOption {
    value: string
    label: string
}

const categoryOptions: ISelectOption[] = [
    { value: 'fairs', label: 'Выставки/презентации' },
    { value: 'open_days', label: 'Дни открытых дверей' },
    { value: 'conferences', label: 'Конференции' },
    { value: 'master_classes', label: 'Мастер‑классы/семинары/тренинги' },
    { value: 'internships', label: 'Стажировки' },
    { value: 'job_fairs', label: 'Ярмарки вакансий' },
]

const cityOptions: ISelectOption[] = [
    { value: 'minsk', label: 'Минск' },
    { value: 'brest', label: 'Брест' },
    { value: 'vitebsk', label: 'Витебск' },
    { value: 'gomel', label: 'Гомель' },
    { value: 'grodno', label: 'Гродно' },
    { value: 'mogilev', label: 'Могилев' },
]

const categoryValueBySlug: Record<string, string> = {
    fairs: 'выставка',
    open_days: 'дни открытых дверей',
    conferences: 'конференции',
    master_classes: 'мастер‑классы/семинары/тренинги',
    internships: 'стажировки',
    job_fairs: 'ярмарки вакансий',
}
const cityValueBySlug: Record<string, string> = {
    minsk: 'Минск',
    brest: 'Брест',
    vitebsk: 'Витебск',
    gomel: 'Гомель',
    grodno: 'Гродно',
    mogilev: 'Могилев',
}

const categoryLabelBySlug: Record<string, string> = Object.fromEntries(categoryOptions.map((o) => [o.value, o.label]))
const cityLabelBySlug: Record<string, string> = Object.fromEntries(cityOptions.map((o) => [o.value, o.label]))

const EventsPageDesktop: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredContent, setFilteredContent] = useState(content)

    const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({
        from: null,
        to: null,
    })
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedCities, setSelectedCities] = useState<string[]>([])

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
            .filter((item) =>
                selectedCities.length === 0 ? true : selectedCities.some((slug) => cityValueBySlug[slug] === item.city),
            )

        setFilteredContent(result)
        setCurrentPage(1)
    }, [dates, selectedCategories, selectedCities])

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

                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pt-[116px] pb-[30px]">
                        <EventsSelectSearchDesktop selected={selectedCategories} onChange={setSelectedCategories} />
                        <EventsSelectSearchDateDesktop dates={dates} setDates={setDates} />
                        <EventsSelectSearchCityDesktop selected={selectedCities} onChange={setSelectedCities} />
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        {selectedCategories.map((slug) => (
                            <div
                                key={slug}
                                className="flex items-center rounded-full bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] px-4 py-2 text-white"
                            >
                                {categoryLabelBySlug[slug]}
                                <button
                                    onClick={() => setSelectedCategories((prev) => prev.filter((s) => s !== slug))}
                                    className="ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {(dates.from || dates.to) && (
                            <div className="flex items-center rounded-full bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] px-4 py-2 text-white">
                                {dates.from && dates.to
                                    ? `${dates.from.toLocaleDateString('ru-RU')} — ${dates.to.toLocaleDateString('ru-RU')}`
                                    : dates.from
                                    ? `С ${dates.from.toLocaleDateString('ru-RU')}`
                                    : `До ${dates.to?.toLocaleDateString('ru-RU')}`}
                                <button onClick={() => setDates({ from: null, to: null })} className="ml-2">
                                    ✕
                                </button>
                            </div>
                        )}

                        {selectedCities.map((slug) => (
                            <div
                                key={slug}
                                className="flex items-center rounded-full bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] px-4 py-2 text-white"
                            >
                                {cityLabelBySlug[slug]}
                                <button
                                    onClick={() => setSelectedCities((prev) => prev.filter((s) => s !== slug))}
                                    className="ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {(selectedCategories.length > 0 || selectedCities.length > 0 || dates.from || dates.to) && (
                            <button
                                onClick={() => {
                                    setSelectedCategories([])
                                    setSelectedCities([])
                                    setDates({ from: null, to: null })
                                }}
                                className="ml-4 rounded-[18px] border-2 border-[#878797] px-4 py-2 text-[#FFFFFFCC] hover:border-white hover:text-white"
                            >
                                Сбросить фильтры
                            </button>
                        )}
                    </div>

                    <div className="flex min-h-[40vh] flex-wrap justify-center gap-[36px] 2xl:gap-[20px] 3xl:gap-[25px] 4xl:gap-[30px]">
                        {!isEmpty ? (
                            paginated.map((item) => (
                                <EventsCardDesktop
                                    key={item.id}
                                    title={item.title}
                                    category={item.category}
                                    image={item.image}
                                    date={item.date}
                                    time={item.time}
                                    week={item.week}
                                    city={item.city}
                                    place={item.place}
                                    company={item.company}
                                />
                            ))
                        ) : (
                            <p className="pt-10 text-4xl opacity-20">Нет мероприятий по данным фильтрам</p>
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