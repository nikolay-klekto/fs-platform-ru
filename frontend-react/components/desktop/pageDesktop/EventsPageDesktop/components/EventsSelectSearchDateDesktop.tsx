'use client'

import React, { useState, useRef, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { ChevronDownIconDesktop, LineDateDesktop, CalendarIconsDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

interface IEventsSelectSearchDateProps {
    dates: {
        from: Date | null
        to: Date | null
    }
    onChange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>
}

type DateKey = 'from' | 'to'

const EventsSelectSearchDateDesktop: React.FC<IEventsSelectSearchDateProps> = ({ dates, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openCalendars, setOpenCalendars] = useState<{ from: boolean; to: boolean }>({
        from: false,
        to: false,
    })
    const [inputValues, setInputValues] = useState<{ from: string; to: string }>({
        from: '',
        to: '',
    })

    const calendarRef = useRef<HTMLDivElement>(null)
    const fromCalendarRef = useRef<HTMLDivElement>(null)
    const toCalendarRef = useRef<HTMLDivElement>(null)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const autoFormatDate = (value: string): string => {
        const numbersOnly = value.replace(/\D/g, '')
        const day = numbersOnly.slice(0, 2)
        const month = numbersOnly.slice(2, 4)
        const year = numbersOnly.slice(4, 8)
        let formatted = day
        if (month) formatted += `.${month}`
        if (year) formatted += `.${year}`
        return formatted
    }

    const isValidDate = (dateStr: string): boolean => {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/
        if (!dateRegex.test(dateStr)) return false
        const [day, month, year] = dateStr.split('.').map(Number)
        const parsedDate = new Date(year, month - 1, day)
        return !isNaN(parsedDate.getTime())
    }

    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split('.').map(Number)
        return new Date(year, month - 1, day)
    }

    const handleInputChange = (key: DateKey, value: string) => {
        const formatted = autoFormatDate(value)
        setInputValues((prev) => ({ ...prev, [key]: formatted }))

        if (!formatted) {
            onChange((prev) => ({ ...prev, [key]: null }))
        }

        if (isValidDate(formatted)) {
            const parsedDate = parseDate(formatted)
            onChange((prev) => ({ ...prev, [key]: parsedDate }))
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        const outsideWrapper = calendarRef.current && !calendarRef.current.contains(event.target as Node)
        const outsideFrom = fromCalendarRef.current && !fromCalendarRef.current.contains(event.target as Node)
        const outsideTo = toCalendarRef.current && !toCalendarRef.current.contains(event.target as Node)

        if (outsideWrapper) setIsOpen(false)
        if (outsideFrom && outsideTo) setOpenCalendars({ from: false, to: false })
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleCalendar = (calendar: DateKey) => {
        setOpenCalendars((prev) => ({
            from: false,
            to: false,
            [calendar]: !prev[calendar],
        }))
    }

    const handleDateChange = (key: DateKey, newDate?: Date) => {
        onChange((prev) => ({ ...prev, [key]: newDate ?? null }))
        setInputValues((prev) => ({
            ...prev,
            [key]: newDate ? autoFormatDate(newDate.toLocaleDateString('ru-RU')) : '',
        }))
        setOpenCalendars((prev) => ({ ...prev, [key]: false }))
        if (key === 'to') setIsOpen(false)
    }

    const handleDatePreset = (type: string) => {
        const now = new Date()
        const ONE_DAY_MS = 86_399_999
        let fromDate: Date | undefined
        let toDate: Date | undefined

        switch (type) {
            case 'today':
                fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                toDate = new Date(fromDate.getTime() + ONE_DAY_MS)
                break
            case 'tomorrow':
                const t = now.getDate() + 1
                fromDate = new Date(now.getFullYear(), now.getMonth(), t)
                toDate = new Date(fromDate.getTime() + ONE_DAY_MS)
                break
            case 'this-week':
                const dayOfWeek = now.getDay() || 7
                const startOfWeek = new Date(now)
                startOfWeek.setDate(now.getDate() - (dayOfWeek - 1))
                startOfWeek.setHours(0, 0, 0, 0)
                const endOfWeek = new Date(startOfWeek)
                endOfWeek.setDate(startOfWeek.getDate() + 6)
                endOfWeek.setHours(23, 59, 59, 999)
                fromDate = startOfWeek
                toDate = endOfWeek
                break
            case 'this-month':
                fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
                toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                break
        }

        onChange({ from: fromDate ?? null, to: toDate ?? null })
        setInputValues({
            from: fromDate ? autoFormatDate(fromDate.toLocaleDateString('ru-RU')) : '',
            to: toDate ? autoFormatDate(toDate.toLocaleDateString('ru-RU')) : '',
        })
        setOpenCalendars({ from: false, to: false })
    }

    return (
        <div className="relative z-[3]" ref={calendarRef}>
            <Button
                variant={'select_btn_desktop'}
                size={'select_btn_desktop_date'}
                onClick={handleSelectToggle}
                className={`${isOpen ? 'is-open' : 'bg-[#101030]'}`}
            >
                Дата
                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {isOpen && (
                <div className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[430px] rounded-[42px] p-[2px] 2xl:w-[270px] bg-gradient-desktop">
                    <div className="relative flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        <div className="custom-grey flex items-center justify-between">
                            <div className="relative flex flex-col" ref={fromCalendarRef}>
                                <p>От</p>
                                <div
                                    className="desktop 3xl:w-[120px] flex h-[50px] w-[178px] items-center justify-center gap-1 rounded-[42px] border-2 border-[#878797] 2xl:w-[110px]"
                                    onClick={() => toggleCalendar('from')}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') toggleCalendar('from')
                                    }}
                                >
                                    <CalendarIconsDesktop />
                                    <IMaskInput
                                        mask="00.00.0000"
                                        lazy={false}
                                        placeholder="__.__.____"
                                        value={inputValues.from}
                                        onAccept={(value) => handleInputChange('from', value)}
                                        onFocus={() => setOpenCalendars((prev) => ({ ...prev, from: true }))}
                                        className="4xl:text-2xl 3xl:text-xl w-[81px] border-none bg-transparent text-[18px] outline-none placeholder:text-gray-500 2xl:w-[75px] 2xl:text-lg"
                                    />
                                </div>
                                {openCalendars.from && (
                                    <div className="absolute left-0 top-full z-20 mt-2">
                                        <Calendar
                                            mode="single"
                                            selected={dates.from || undefined}
                                            onSelect={(date) => handleDateChange('from', date)}
                                            className="size-full rounded-[50px] border-[#878797] bg-[#353652] shadow-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <LineDateDesktop className="mt-5" />

                            <div className="relative flex flex-col" ref={toCalendarRef}>
                                <p>До</p>
                                <div
                                    className="desktop 3xl:w-[120px] flex h-[50px] w-[178px] items-center justify-center gap-1 rounded-[42px] border-2 border-[#878797] 2xl:w-[110px]"
                                    onClick={() => toggleCalendar('to')}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') toggleCalendar('to')
                                    }}
                                >
                                    <CalendarIconsDesktop />
                                    <IMaskInput
                                        mask="00.00.0000"
                                        lazy={false}
                                        placeholder="__.__.____"
                                        value={inputValues.to}
                                        onAccept={(value) => handleInputChange('to', value)}
                                        onFocus={() => setOpenCalendars((prev) => ({ ...prev, to: true }))}
                                        className="4xl:text-2xl 3xl:text-xl w-[81px] border-none bg-transparent text-[18px] outline-none placeholder:text-gray-500 2xl:w-[75px] 2xl:text-lg"
                                    />
                                </div>
                                {openCalendars.to && (
                                    <div className="absolute right-0 top-full z-20 mt-2">
                                        <Calendar
                                            mode="single"
                                            selected={dates.to ?? undefined}
                                            onSelect={(date) => handleDateChange('to', date)}
                                            className="size-full rounded-[50px] border-[#878797] bg-[#353652] shadow-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            variant={'hover_button_date'}
                            size={'hover_button_date_desktop'}
                            onClick={() => handleDatePreset('today')}
                        >
                            Сегодня
                        </Button>
                        <Button
                            variant={'hover_button_date'}
                            size={'hover_button_date_desktop'}
                            onClick={() => handleDatePreset('tomorrow')}
                        >
                            Завтра
                        </Button>
                        <Button
                            variant={'hover_button_date'}
                            size={'hover_button_date_desktop'}
                            onClick={() => handleDatePreset('this-week')}
                        >
                            На этой неделе
                        </Button>
                        <Button
                            variant={'hover_button_date'}
                            size={'hover_button_date_desktop'}
                            onClick={() => handleDatePreset('this-month')}
                        >
                            В этом месяце
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventsSelectSearchDateDesktop
