import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

type DatePickerCalendarProps = {
    onConfirm: (newDate: string) => void
    onCancel: () => void
}

const DatePickerCalendarMobi: React.FC<DatePickerCalendarProps> = ({ onConfirm, onCancel }) => {
    const formatDate = (date: Date): string => {
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()
        return `${dd}.${mm}.${yyyy}`
    }

    const [isOpen, setIsOpen] = useState(true)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2004, 0, 1))

    const modalRef = useRef<HTMLDivElement>(null)

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i)

    const [visibleDayIndex, setVisibleDayIndex] = useState(days.indexOf(selectedDate.getDate()))
    const [visibleMonthIndex, setVisibleMonthIndex] = useState(selectedDate.getMonth())
    const [visibleYearIndex, setVisibleYearIndex] = useState(years.indexOf(selectedDate.getFullYear()))

    useEffect(() => {
        const newDate = new Date(
            years[visibleYearIndex],
            visibleMonthIndex,
            Math.min(days[visibleDayIndex], new Date(years[visibleYearIndex], visibleMonthIndex + 1, 0).getDate()),
        )

        if (
            selectedDate.getFullYear() !== newDate.getFullYear() ||
            selectedDate.getMonth() !== newDate.getMonth() ||
            selectedDate.getDate() !== newDate.getDate()
        ) {
            setSelectedDate(newDate)
        }
    }, [visibleDayIndex, visibleMonthIndex, visibleYearIndex])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCancel()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    const handleSelect = (date: Date) => {
        onConfirm(formatDate(date))
        setIsOpen(false)
    }

    const handleCancel = () => {
        onCancel()
        setIsOpen(false)
    }

    const handleDayChange = (index: number) => {
        setVisibleDayIndex((visibleDayIndex + (index - 1) + days.length) % days.length)
    }

    const handleMonthChange = (index: number) => {
        setVisibleMonthIndex((visibleMonthIndex + (index - 1) + months.length) % months.length)
    }

    const handleYearChange = (index: number) => {
        setVisibleYearIndex((visibleYearIndex + (index - 1) + years.length) % years.length)
    }

    const getVisibleItems = (items: (string | number)[], currentIndex: number): (string | number)[] => {
        const prevIndex = (currentIndex - 1 + items.length) % items.length
        const nextIndex = (currentIndex + 1) % items.length
        return [items[prevIndex], items[currentIndex], items[nextIndex]]
    }

    const visibleDays = getVisibleItems(days, visibleDayIndex)
    const visibleMonths = getVisibleItems(months, visibleMonthIndex)
    const visibleYears = getVisibleItems(years, visibleYearIndex)

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%] ">
                    <div ref={modalRef} className="bg-[#101030] p-6 shadow-lg w-80 relative rounded-[16px]">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col items-center">
                                {visibleDays.map((day, index) => {
                                    const isActive = index === 1
                                    return (
                                        <div
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    handleDayChange(index)
                                                }
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            key={day}
                                            className={`
                py-2
                cursor-pointer
                relative
                w-[60px]
                text-center
                whitespace-nowrap
                text-white
                ${isActive ? 'text16px_mobi' : 'text14px_mobi opacity-50'}
                ${
                    index < visibleDays.length - 1
                        ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:opacity-70 after:bg-[#FFFFFF]'
                        : ''
                }
                ${
                    index > 0
                        ? 'before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] after:opacity-70 before:bg-[#FFFFFF]'
                        : ''
                }
              `}
                                            onClick={() =>
                                                setVisibleDayIndex(
                                                    (visibleDayIndex + (index - 1) + days.length) % days.length,
                                                )
                                            }
                                        >
                                            {day}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex items-center justify-center relative h-full">
                                <div className="flex flex-col items-center justify-center">
                                    {visibleMonths.map((month, index) => (
                                        <div
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    handleMonthChange(index)
                                                }
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            key={month}
                                            className={`
                    py-2
                    text-center
                    cursor-pointer
                    relative
                    w-[80px]
                    whitespace-nowrap
                    text-white
                    ${index === 1 ? 'text16px_mobi text-white' : 'text14px_mobi opacity-50'}
                    ${
                        index < visibleMonths.length - 1
                            ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:opacity-70 after:bg-[#FFFFFF]'
                            : ''
                    }
                    ${
                        index > 0
                            ? 'before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] after:opacity-70 before:bg-[#FFFFFF]'
                            : ''
                    }
                `}
                                            onClick={() =>
                                                setVisibleMonthIndex(
                                                    (visibleMonthIndex + (index - 1) + months.length) % months.length,
                                                )
                                            }
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                {visibleYears.map((year, index) => (
                                    <div
                                        key={year}
                                        role="button"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault()
                                                handleYearChange(index)
                                            }
                                        }}
                                        tabIndex={0}
                                        className={`py-2 cursor-pointer relative w-[60px] text-white ${
                                            index === 1 ? 'text16px_mobi' : 'text14px_mobi opacity-50'
                                        } ${
                                            index < visibleYears.length - 1
                                                ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:opacity-70 after:bg-[#FFFFFF]'
                                                : ''
                                        } ${
                                            index > 0
                                                ? 'before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] after:opacity-70 before:bg-[#FFFFFF]'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setVisibleYearIndex(
                                                (visibleYearIndex + (index - 1) + years.length) % years.length,
                                            )
                                        }
                                    >
                                        {year}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleCancel}
                                className="text-[#878797] text12px_mobi mx-4 my-2 font-semibold transition-colors border-b border-[#878797]"
                            >
                                Отмена
                            </button>
                            <Button
                                onClick={() => handleSelect(selectedDate)}
                                type="submit"
                                variant="select_mobi"
                                className="m-w-[180px] text-2xl w-[100%]"
                            >
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DatePickerCalendarMobi
