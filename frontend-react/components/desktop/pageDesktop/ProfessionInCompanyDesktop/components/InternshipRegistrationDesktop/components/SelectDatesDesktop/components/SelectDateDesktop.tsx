'use client'

import React, { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { CalendarIconsDesktop } from '@/components/assets/iconsDesktop'
import { cn } from '@/lib/utils'

interface ISelectDateDesktopProps {
    error?: boolean
    selectedDate?: Date | null
    onChange?: (date: Date | null) => void
}

const SelectDateDesktop: React.FC<ISelectDateDesktopProps> = ({ error = false, selectedDate, onChange }) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (selectedDate) {
            const formatted = selectedDate.toLocaleDateString('ru-RU')
            setInputValue(formatted)
        } else {
            setInputValue('')
        }
    }, [selectedDate])

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
        setInputValue(value)
        if (isValidDate(value)) {
            onChange?.(parseDate(value))
        } else {
            onChange?.(null)
        }
    }

    return (
        <div className="relative">
            <div
                className={cn(
                    'flex items-center justify-between px-[38px] 3xl:px-[29px] 2xl:px-[16px] w-[333px] 3xl:w-[260px] 2xl:w-[215px] h-[77px] border-[3.7px] rounded-[92px] transition-colors',
                    error ? 'border-[#BC8070]' : 'border-[#878797]',
                )}
            >
                <CalendarIconsDesktop color={error ? '#BC8070' : '#878797'} className="size-[46px]  2xl:size-[30px] 3xl:size-[40px]" />
                <IMaskInput
                    mask="00.00.0000"
                    lazy={false}
                    placeholder="__.__.____"
                    value={inputValue}
                    onAccept={handleInputChange}
                    className={cn(
                        'font-medium w-[181px] 3xl:w-[150px] 2xl:w-[120px] bg-transparent text-center text33px_desktop placeholder:text-[#878797]',
                        error ? 'text-[#BC8070]' : inputValue ? 'text-white' : 'text-[#878797]',
                    )}
                />
            </div>
        </div>
    )
}

export default SelectDateDesktop
