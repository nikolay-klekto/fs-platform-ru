'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CheckedBoxIconDesktop, ChevronDownIconDesktop, QuestionMarkDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { HelpEventsTooltipDesktop } from '@/components/ui/tooltip'

interface ISelectItem {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

interface ISelectOption {
    value: string
    label: string
    tooltipMessage: string
}
interface IEventsSelectSearch {
    selectedOptions: string[]
    onChange: (newSelected: string[]) => void
}

const EventsSelectSearchDesktop: React.FC<IEventsSelectSearch> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
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
        {
            value: 'fairs',
            label: 'Выставки/презентации',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
        {
            value: 'open_days',
            label: 'Дни открытых дверей',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
        {
            value: 'conferences',
            label: 'Конференции',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
        {
            value: 'master_classes',
            label: 'Мастер-классы/семинары/тренинги',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
        {
            value: 'internships',
            label: 'Стажировки',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
        {
            value: 'job_fairs',
            label: 'Ярмарки вакансий',
            tooltipMessage:
                'Мероприятия, где компании представляют свои продукты, услуги или достижения. Полезно для знакомства с компаниями и их деятельностью.',
        },
    ]
    const toggleOption = (value: string) => {
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
        )
    }
    return (
        <div className="relative z-[3]" ref={dropdownRef}>
            <Button
                variant={'select_btn_desktop'}
                size={'select_btn_desktop_events'}
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
                <div className="absolute right-0 top-[80px] z-50 w-[400px] rounded-[42px] bg-gradient-desktop p-[2px] 2xl:w-[270px] 3xl:w-[300px]">
                    <div className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                isChecked={selectedOptions.includes(option.value)}
                                onClick={() => toggleOption(option.value)}
                                tooltipMessage={option.tooltipMessage}
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

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItem & { tooltipMessage: string }>(
    ({ children, isChecked, onClick, tooltipMessage, ...props }, forwardedRef) => {
        return (
            <div
                className={`relative flex cursor-pointer items-center justify-between rounded-[18px] p-[15px] text-[15px] font-medium ${
                    isChecked ? 'bg-[#5F4AF30F] text-white' : 'bg-transparent text-[#878797]'
                }`}
                {...props}
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
                            <CheckedBoxIconDesktop
                                style={{
                                    position: 'absolute',
                                    width: '30px',
                                    height: '25px',
                                }}
                            />
                        ) : (
                            <div
                                className="absolute inset-0 z-[3] rounded-[3px]"
                                style={{
                                    border: '2px solid #878797',
                                    background: 'transparent',
                                }}
                            />
                        )}
                    </div>
                    <div className="pl-[14px]">{children}</div>
                </div>

                <div className="flex items-center">
                    <HelpEventsTooltipDesktop tooltipMessage={tooltipMessage} />
                    <QuestionMarkDesktop />
                </div>
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchDesktop
