'use client'

import React, { useState, useRef, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { Calendar as CalendarPrimitive } from '@/components/ui/calendar'
import { CalendarIconsDesktop } from '@/components/assets/iconsDesktop'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectDateDesktopProps {
    error?: boolean
    selectedDates?: { startDate: Date | null; endDate: Date | null }
    onChange?: (range: { startDate: Date | null; endDate: Date | null }) => void
    onErrorChange?: (value: boolean) => void
}

const SelectDateDesktop: React.FC<SelectDateDesktopProps> = ({ error = false, onChange, onErrorChange }) => {
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
            const parsed = parseDate(formatted)
            setSelectedDate(parsed)
            onChange?.({ startDate: parsed, endDate: null })
            onErrorChange?.(false)
        } else {
            setSelectedDate(null)
            onChange?.({ startDate: null, endDate: null })
            onErrorChange?.(true)
        }
    }

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return
        setSelectedDate(date)
        setInputValue(autoFormatDate(date.toLocaleDateString('ru-RU')))
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={calendarRef}>
            <div
                className={cn(
                    'flex items-center justify-between px-[38px]',
                    'rounded-[92px]',
                    'transition-colors',
                    error ? 'border-[3.71px] border-[#BC8070]' : 'border-[3.71px] border-[#878797]',
                )}
                style={{
                    width: 333,
                    height: 77,
                }}
            >
                <button className="flex cursor-pointer items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
                    <CalendarIconsDesktop color={error ? '#BC8070' : '#878797'} className="size-[46px]" />
                </button>
                <IMaskInput
                    mask="00.00.0000"
                    lazy={false}
                    placeholder="__.__.____"
                    value={inputValue}
                    onAccept={handleInputChange}
                    className={cn(
                        'font-medium w-[181px] bg-transparent text-center text-[33px]',
                        error
                            ? 'text-[#BC8070] font-medium placeholder:text-[#BC8070] placeholder:font-medium'
                            : 'text-[#878797] placeholder:text-[#878797]',
                    )}
                />
            </div>

            {isOpen && (
                <div className="absolute left-0 top-full z-[9999] mt-2 p-3">
                    <CalendarPrimitive
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={handleDateSelect}
                        className="rounded-[25px] bg-[#353652] p-4 text-white shadow-lg"
                        components={{
                            IconLeft: (props) => <ChevronLeft {...props} className="h-15 w-8 " />,
                            IconRight: (props) => <ChevronRight {...props} className="h-15 w-8" />,
                        }}
                        classNames={{
                            day: cn(
                                'w-[44px] h-[44px] flex items-center justify-center rounded-full transition-all text-[18px] font-medium',
                                'text-white',
                                'hover:gradient-desktop-hover hover:text-white',
                                'aria-selected:gradient-desktop-hover aria-selected:text-white',
                            ),

                            head_cell: cn(
                                'w-[44px] h-[44px] flex items-center justify-center text-[18px] font-medium',
                                'text-[#878797]',
                            ),

                            caption_label: cn('text-[22px] font-semibold', 'text-white'),
                            nav_button: 'text-white',
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default SelectDateDesktop
