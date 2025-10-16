'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop, HelpIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HelpInternshipTooltipDesktop } from '@/components/ui/tooltip'
import { ISelectOption, ISelectTypeDesktop } from '@/types/selectors/selectors'

const SelectTypeDesktop: React.FC<ISelectTypeDesktop> = ({ onTypeChange, onValidationChange, error = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isMediumScreen, setIsMediumScreen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkScreen = () => {
            const width = window.innerWidth
            setIsMediumScreen(width >= 1240 && width < 1560)
        }

        checkScreen()
        window.addEventListener('resize', checkScreen)
        return () => window.removeEventListener('resize', checkScreen)
    }, [])

    const handleSelectToggle = () => setIsOpen((prev) => !prev)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const isValid = !!selectedOption
        onValidationChange?.(isValid)
        if (selectedOption) onTypeChange([selectedOption])
    }, [selectedOption, onTypeChange, onValidationChange])

    const options: ISelectOption[] = [
        { value: 'observer', label: 'Наблюдать за рабочим процессом' },
        { value: 'participant', label: 'Участвовать в рабочем процессе' },
    ]

    const options1: ISelectOption[] = [
        {
            label: 'На стажировке Вас ждет ментор,\nобзорные экскурсии и рабочее место,\nбез необходимости работать',
            value: 'observer',
        },
        {
            value: 'participant',
            label: 'Вы получаете стажировку\nнаблюдателя, но с рабочими\nзадачами под ваш уровень и\nчеловеком, который в случае чего\nпоможет подтянуть знания',
        },
    ]

    return (
        <div className="relative z-[1] w-[758px] 2xl:w-[500px] 3xl:w-[600px]" ref={selectRef}>
            <Button
                variant={'select_internship_btn_desktop'}
                size={'select_internship_btn_desktop'}
                onClick={handleSelectToggle}
                className={cn(
                    'flex items-center justify-between px-[45px] 2xl:px-[35px] text32px_desktop font-medium',
                    error
                        ? 'border-[rgba(188,128,112,1)] text-[rgba(188,128,112,0.6)]'
                        : isOpen || selectedOption
                        ? 'border-white text-white'
                        : 'border-[#878797] text-[#878797]',
                )}
            >
                {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Выберите вид стажировки'}

                <ChevronDownIconDesktop
                    color={error ? 'rgba(188,128,112,0.6)' : 'rgba(255,255,255,0.6)'}
                    className={cn(
                        'h-[24px] w-[43px] transition-transform duration-200 2xl:w-[35px]',
                        isOpen ? 'rotate-180' : '',
                    )}
                />
            </Button>

            {isOpen && (
                <div className="absolute top-[96px] z-[9999] flex w-[751px] 2xl:w-[550px] 3xl:w-[600px] flex-col rounded-[44px] border-[3.7px] border-[#FFFFFF80] bg-[#1F203F] overflow-hidden">
                    {options.map((option, index) => {
                        const isFirst = index === 0
                        const isLast = index === options.length - 1

                        return (
                            <div key={option.value}>
                                <button
                                    type="button"
                                    className={cn(
                                        'flex items-center justify-between mx-[13px] my-[8px] w-[calc(100%-26px)] px-[42px] py-[20px]',
                                        isFirst ? 'rounded-t-[33px]' : '',
                                        isLast ? 'rounded-b-[33px]' : '',
                                        'transition-all duration-200 cursor-pointer hover:bg-internship-desktop-hover',
                                    )}
                                    onClick={() => {
                                        setSelectedOption(option.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    <span
                                        className={cn(
                                            'text33px_desktop whitespace-nowrap font-medium text-left',
                                            selectedOption === option.value ? 'text-white' : 'text-[#878797]',
                                            'transition-colors duration-200',
                                        )}
                                    >
                                        {option.label}
                                    </span>

                                    <HelpInternshipTooltipDesktop
                                        className={cn(
                                            'z-50 overflow-hidden rounded-[35px] opacity-80',
                                            isMediumScreen
                                                ? "w-[420px] bg-[url('/background/internship-type-popup-2xl.png')] bg-cover bg-no-repeat"
                                                : "w-[540px] bg-[url('/background/internship-type-popup2.png')]",
                                        )}
                                        contentClassName={isMediumScreen ? "p-[27px_13px_20px_26px]" : "p-[30px_34px_15px_25px]"}
                                        textClassName="text-left text24px_desktop text-white whitespace-pre-line"
                                        side="bottom"
                                        align={isMediumScreen ? "end" : "start"}
                                        tooltipMessage={options1.find((o) => o.value === option.value)?.label || ''}
                                    >
                                        <div className="size-[42px]">
                                            <HelpIconDesktop className="size-[42px] cursor-pointer" />
                                        </div>
                                    </HelpInternshipTooltipDesktop>
                                </button>

                                {!isLast && <div className="h-[3.7px] bg-[#353652] mx-[37px]" />}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SelectTypeDesktop
