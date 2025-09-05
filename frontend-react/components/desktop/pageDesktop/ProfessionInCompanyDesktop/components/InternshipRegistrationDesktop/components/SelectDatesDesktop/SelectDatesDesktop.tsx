'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Calendar } from 'lucide-react'
import { PlusIconDesktop } from '@/components/assets/iconsDesktop'
import SelectDateDesktop from './components/SelectDateDesktop'

interface ISelectDatesDesktopProps {
    onErrorChange?: (value: boolean) => void
    submitted?: boolean // флаг, что форма прошла валидацию
}

export interface IDateInterval {
    startDate: Date | null
    endDate: Date | null
}

interface IDateOption {
    start: string
    end: string
}

const dateOptions: IDateOption[] = [
    { start: '19.08.2025', end: '25.08.2025' },
    { start: '05.09.2025', end: '15.09.2025' },
]

const parseDate = (str: string): Date => {
    const [day, month, year] = str.split('.').map(Number)
    return new Date(year, month - 1, day)
}

const SelectDatesDesktop: React.FC<ISelectDatesDesktopProps> = ({ onErrorChange, submitted = false }) => {
    const [intervals, setIntervals] = useState<IDateInterval[]>([{ startDate: null, endDate: null }])
    const [intervalErrors, setIntervalErrors] = useState<boolean[]>([false])
    const [touched, setTouched] = useState<boolean[]>([false])
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenIndex(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const validateIntervals = (allIntervals: IDateInterval[]) => {
        const newErrors = allIntervals.map(
            (interval) => !interval.startDate || !interval.endDate || interval.startDate > interval.endDate,
        )
        setIntervalErrors(newErrors)
        onErrorChange?.(newErrors.some((e) => e))
        return newErrors
    }

    const handleDateChange = (index: number, key: 'startDate' | 'endDate', date: Date | null) => {
        const newIntervals = [...intervals]
        newIntervals[index] = { ...newIntervals[index], [key]: date }
        setIntervals(newIntervals)

        const newTouched = [...touched]
        newTouched[index] = true
        setTouched(newTouched)

        validateIntervals(newIntervals)
    }

    const handleAddDateInterval = () => {
        setIntervals((prev) => [...prev, { startDate: null, endDate: null }])
        setTouched((prev) => [...prev, false])
    }

    const handleRemoveDateInterval = (index: number) => {
        const newIntervals = intervals.filter((_, i) => i !== index)
        const newTouched = touched.filter((_, i) => i !== index)
        setIntervals(newIntervals)
        setTouched(newTouched)
        validateIntervals(newIntervals)
    }

    const handleSelectOption = (opt: IDateOption, index: number) => {
        const start = parseDate(opt.start)
        const end = parseDate(opt.end)
        const newIntervals = [...intervals]
        newIntervals[index] = { startDate: start, endDate: end }
        setIntervals(newIntervals)

        const newTouched = [...touched]
        newTouched[index] = true
        setTouched(newTouched)

        validateIntervals(newIntervals)
        setOpenIndex(null)
    }

    useEffect(() => {
        if (submitted) {
            validateIntervals(intervals)
        }
    }, [submitted])

    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="mb-[25px] flex flex-col items-start gap-[31px]">
            {intervals.map((interval, index) => {
                const showError = (touched[index] || submitted) && intervalErrors[index]

                return (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="relative flex items-center gap-4" ref={dropdownRef}>
                            <button type="button" className="m-0 p-0" onClick={() => toggleDropdown(index)}>
                                <SelectDateDesktop
                                    selectedDate={interval.startDate}
                                    onChange={(date) => handleDateChange(index, 'startDate', date)}
                                    error={showError}
                                />
                            </button>

                            <span className={`block h-[4px] w-[37px] ${showError ? 'bg-[#BC8070]' : 'bg-[#878797]'}`} />

                            <SelectDateDesktop
                                selectedDate={interval.endDate}
                                onChange={(date) => handleDateChange(index, 'endDate', date)}
                                error={showError}
                            />

                            {intervals.length > 1 && (
                                <button onClick={() => handleRemoveDateInterval(index)} className="group relative ml-4">
                                    <X
                                        size={70}
                                        color={showError ? '#BC8070' : '#878797'}
                                        className="opacity-50 hover:opacity-100"
                                    />
                                    <div
                                        className="absolute left-1/2 top-full z-10 -mt-7
                                    translate-x-[-40px] opacity-0 transition-opacity duration-200 
                                    group-hover:opacity-100"
                                    >
                                        <div
                                            className="flex h-[77px] w-[339px] items-center justify-center 
                                        whitespace-nowrap rounded-[50px] 
                                        bg-[url('/background/delete-dates-desktop.png')] bg-cover bg-no-repeat 
                                        pb-[14px] pt-[30px] text-[21px] text-white"
                                        >
                                            Удалить интервал дат
                                        </div>
                                    </div>
                                </button>
                            )}

                            {openIndex === index && (
                                <div
                                    className="absolute left-0 top-[90px] z-50 flex w-[433px] flex-col rounded-[44px] border-[3px] border-[#FFFFFF80] bg-[#1F203F] shadow-lg"
                                    style={{ height: '165px' }}
                                >
                                    {dateOptions.map((opt, idx) => (
                                        <div key={idx}>
                                            <button
                                                onClick={() => handleSelectOption(opt, index)}
                                                className="flex w-full items-center gap-3 px-6 py-4 text-left text-[#878797] hover:text-white"
                                            >
                                                <Calendar className="text-inherit" />
                                                <span className="text-[26px] font-medium">
                                                    {opt.start} - {opt.end}
                                                </span>
                                            </button>
                                            {idx < dateOptions.length - 1 && (
                                                <div className="mx-6 h-[2px] bg-[#353652]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {showError && (
                            <p className="text20px_desktop font-medium text-[#BC8070]">Выберите даты стажировки</p>
                        )}
                    </div>
                )
            })}

            <button
                type="button"
                onClick={handleAddDateInterval}
                className="flex items-center gap-2 rounded-[92px] border border-transparent px-[10px]"
                style={{
                    width: '480px',
                    height: '60px',
                    backgroundColor: 'rgba(53, 54, 82, 0.8)',
                }}
            >
                <PlusIconDesktop className="size-[39px]" />
                <span className="text24px_desktop font-medium text-[#878797]">Добавить интервал стажировки</span>
            </button>
        </div>
    )
}

export default SelectDatesDesktop
