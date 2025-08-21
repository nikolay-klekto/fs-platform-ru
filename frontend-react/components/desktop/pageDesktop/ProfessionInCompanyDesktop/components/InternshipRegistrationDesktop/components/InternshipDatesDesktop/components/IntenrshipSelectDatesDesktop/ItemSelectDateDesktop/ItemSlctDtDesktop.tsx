'use client'

import React, { useState, useRef, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIconsDesktop } from '@/components/assets/iconsDesktop'

const InternshipSelectDateDesktop: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [inputValue, setInputValue] = useState('')

    const calendarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const autoFormatDate = (value: string): string => {
        const numbersOnly = value.replace(/\D/g, '')
        const day = numbersOnly.slice(0, 2)
        const month = numbersOnly.slice(2, 4)
        const year = numbersOnly.slice(4, 8)
        let formattedDate = day
        if (month) formattedDate += `.${month}`
        if (year) formattedDate += `.${year}`
        return formattedDate
    }

    const isValidDate = (dateStr: string) => {
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

    const handleInputChange = (value: string) => {
        const formatted = autoFormatDate(value)
        setInputValue(formatted)
        if (isValidDate(formatted)) {
            setSelectedDate(parseDate(formatted))
        } else {
            setSelectedDate(null)
        }
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        setInputValue(autoFormatDate(date.toLocaleDateString('ru-RU')))
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={calendarRef}>
            {/* Контейнер с бордером */}
            <div
                className="flex items-center justify-between px-[38px]"
                style={{
                    width: 333,
                    height: 77,
                    border: '3.71px solid #878797',
                    borderRadius: '92px',
                }}
            >
                <button className="cursor-pointer flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
                    <CalendarIconsDesktop className="h-[46px] w-[46px]" />
                </button>
                <IMaskInput
                    mask="00.00.0000"
                    lazy={false}
                    placeholder="__.__.____"
                    value={inputValue}
                    onAccept={handleInputChange}
                    className="font-medium-500 w-[181px] bg-transparent text-center text-[33px] text-white"
                />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 z-100 mt-2 rounded-lg bg-[#1F203F] p-3 shadow-lg">
                    <Calendar
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={handleDateSelect}
                        className="rounded-[12px] border border-[#878797] bg-[#353652]"
                    />
                </div>
            )}
        </div>
    )
}

export default InternshipSelectDateDesktop
