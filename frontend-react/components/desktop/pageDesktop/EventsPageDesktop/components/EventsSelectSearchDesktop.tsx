'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIconDesktop, CheckedBoxIconDesktop, QuestionMarkDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

interface EventsSelectSearchDesktopProps {
    selected: string[]
    onChange: (newSelected: string[]) => void
}

interface ISelectOption {
    value: string
    label: string
}

const EventsSelectSearchDesktop: React.FC<EventsSelectSearchDesktopProps> = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const options: ISelectOption[] = [
        { value: 'Выставки/презентации', label: 'Выставки/презентации' },
        { value: 'Дни открытых дверей', label: 'Дни открытых дверей' },
        { value: 'Конференции', label: 'Конференции' },
        { value: 'Мастер‑классы/семинары/тренинги', label: 'Мастер‑классы/семинары/тренинги' },
        { value: 'Стажировки', label: 'Стажировки' },
        { value: 'Ярмарки вакансий', label: 'Ярмарки вакансий' },
    ]

    const toggleOption = (value: string) => {
        const next = selected.includes(value) ? selected.filter((opt) => opt !== value) : [...selected, value]
        onChange(next)
    }

    return (
        <div className="relative z-[3]" ref={dropdownRef}>
            <Button
                variant="select_btn_desktop"
                size="select_btn_desktop_events"
                onClick={handleSelectToggle}
                className={`${isOpen ? 'bg-gradient-desktop' : 'bg-[#101030]'}`}
            >
                Мероприятия
                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {isOpen && (
                <div
                    className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[400px] rounded-[42px] p-[2px] 2xl:w-[270px]"
                    style={{
                        background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                    }}
                >
                    <div className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                isChecked={selected.includes(option.value)}
                                onClick={() => toggleOption(option.value)}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

interface ISelectItemProps {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItemProps>(
    ({ children, isChecked, onClick }, forwardedRef) => (
        <div
            ref={forwardedRef}
            onClick={onClick}
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick()
                }
            }}
            className={`relative z-[3] flex cursor-pointer items-center justify-between rounded-[18px] p-[15px] text-[15px] font-medium ${
                isChecked ? 'bg-[#5F4AF30F] text-white' : 'bg-transparent text-[#878797]'
            }`}
        >
            <div className="flex items-center">
                <div className="relative flex size-[20px] items-center justify-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                            e.stopPropagation()
                            onClick()
                        }}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                    {isChecked ? (
                        <CheckedBoxIconDesktop style={{ position: 'absolute', width: '30px', height: '25px' }} />
                    ) : (
                        <div
                            className="absolute inset-0 rounded-[3px]"
                            style={{ border: '2px solid #878797', background: 'transparent' }}
                        />
                    )}
                </div>
                <div className="pl-[14px]">{children}</div>
            </div>
            <QuestionMarkDesktop />
        </div>
    ),
)

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchDesktop
