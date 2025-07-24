'use client'

import React, { useState, useEffect } from 'react'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import EventsCardDesktop from './components/EventsCardDesktop'
import EventsPaginationDesktop from './components/EventsPaginationDesktop'
import EventsSelectSearchDesktop from './components/EventsSelectSearchDesktop'
import EventsSelectSearchDateDesktop from './components/EventsSelectSearchDateDesktop'
import EventsSelectSearchCityDesktop from './components/EventsSelectSearchCityDesktop'
import { CloseIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
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

                    <div className="relative z-[1] flex items-center justify-end gap-[30px] pt-[116px]">
                        <EventsSelectSearchDesktop selected={selectedCategories} onChange={setSelectedCategories} />
                        <EventsSelectSearchDateDesktop dates={dates} setDates={setDates} />
                        <EventsSelectSearchCityDesktop selected={selectedCities} onChange={setSelectedCities} />
                    </div>

                    {selectedCategories.length > 0 || selectedCities.length > 0 || dates.from || dates.to ? (
                        <div className="flex flex-wrap items-center gap-x-[32px] gap-y-[16px] mt-[39px] mb-[30px]">
                            {selectedCategories.map((slug) => (
                                <div
                                    key={slug}
                                    className="flex items-center rounded-full bg-[#ffffff1a] py-[16px] pl-[45px] pr-[45px] text-white"
                                >
                                    <span className="font-semibold text-[20px]">{categoryLabelBySlug[slug]}</span>
                                    <button
                                        onClick={() => setSelectedCategories((prev) => prev.filter((s) => s !== slug))}
                                        className="ml-[40px] flex items-center justify-center"
                                    >
                                        <CloseIconDesktop className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}

                            {(dates.from || dates.to) && (
                                <div className="flex items-center rounded-full bg-[#ffffff1a] py-[16px] pl-[45px] pr-[45px] text-white">
                                    <span className="font-semibold text-[20px]">
                                        {dates.from && dates.to
                                            ? `${dates.from.toLocaleDateString('ru-RU')} — ${dates.to.toLocaleDateString('ru-RU')}`
                                            : dates.from
                                              ? `С ${dates.from.toLocaleDateString('ru-RU')}`
                                              : `До ${dates.to?.toLocaleDateString('ru-RU')}`}
                                    </span>
                                    <button
                                        onClick={() => setDates({ from: null, to: null })}
                                        className="ml-[40px] flex items-center justify-center"
                                    >
                                        <CloseIconDesktop className="h-3 w-3" />
                                    </button>
                                </div>
                            )}

                            {selectedCities.map((slug) => (
                                <div
                                    key={slug}
                                    className="flex items-center rounded-full bg-[#ffffff1a] py-[16px] pl-[45px] pr-[45px] text-white"
                                >
                                    <span className="font-semibold text-[20px]">{cityLabelBySlug[slug]}</span>
                                    <button
                                        onClick={() => setSelectedCities((prev) => prev.filter((s) => s !== slug))}
                                        className="ml-[40px] flex items-center justify-center"
                                    >
                                        <CloseIconDesktop className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-[30px]" />
                    )}

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
                            <div className="flex flex-col items-center justify-center pt-113 text-center">
                                <p className="text-[24px] font-medium leading-[40px] text-[#353652] mb-[24px] text-center">
                                    Нет мероприятий по данным категориям
                                </p>

                                {(selectedCategories.length > 0 ||
                                    selectedCities.length > 0 ||
                                    dates.from ||
                                    dates.to) && (
                                    <Button
                                        variant="select_btn_desktop"
                                        size="select_btn_desktop_events"
                                        onClick={() => {
                                            setSelectedCategories([])
                                            setSelectedCities([])
                                            setDates({ from: null, to: null })
                                        }}
                                        className="px-[35px]"
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
