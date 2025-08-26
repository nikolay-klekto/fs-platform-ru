'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop, QuestionMark } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

interface ISelectOption {
    value: string
    label: string
}

const SelectTypeDesktop = ({ onTypeChange }: { onTypeChange: (types: string[]) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const selectRef = useRef<HTMLDivElement>(null)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (selectedOption) {
            onTypeChange([selectedOption])
        }
    }, [selectedOption, onTypeChange])

    const options: ISelectOption[] = [
        { value: 'observer', label: 'Наблюдатель за рабочим процессом' },
        { value: 'participant', label: 'Участвовать в рабочем процессе' },
    ]

    const options1: ISelectOption[] = [
        {
            value: 'observer',
            label: 'Вы получаете стажировку наблюдателя, но с рабочими задачами под Ваш уровень и человеком, который поможет подтянуть знания',
        },
        {
            value: 'participant',
            label: 'На стажировке Вас ждет ментор, обзорные экскурсии и рабочее место, без необходимости работать',
        },
    ]

    return (
        <div className="relative z-[1]" ref={selectRef}>
            {/* Селектор */}
            <Button
                variant={'select_internship_btn_desktop'}
                size={'select_internship_btn_desktop'}
                onClick={handleSelectToggle}
                className={`flex items-center justify-between
          pl-[45px] pr-6
          ${isOpen || selectedOption ? 'border-white text-white' : 'border-[#878797] text-[#878797]'}
          text-[33px] font-medium`}
            >
                {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Выберите вид стажировки'}

                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {/* Дропдаун */}
            {isOpen && (
                <div
                    className="absolute top-[96px] z-[9999] flex flex-col bg-[#1F203F] pl-[42px] pr-[25px]"
                    style={{
                        width: '751px',
                        border: '3.66px solid #878797',
                        borderRadius: '44px',
                    }}
                >
                    {options.map((option, index) => (
                        <div key={option.value}>
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className={`text-left text-[32px] font-medium transition-colors duration-200
        ${selectedOption === option.value ? 'text-white' : 'text-[#878797]'}
        hover:text-white`}
                                    style={{
                                        marginTop: index === 0 ? '40px' : undefined,
                                        paddingBottom: index === options.length - 1 ? '33px' : undefined,
                                    }}
                                    onClick={() => {
                                        setSelectedOption(option.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    {option.label}
                                </button>

                                {/* Иконка вопроса с тултипом */}
                                <div className="relative group ml-4">
                                    <QuestionMark className="h-[40px] w-[41px] cursor-pointer" />
                                    <div
                                        className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 
          opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    >
                                        <div
                                            className="flex w-[339px] items-center justify-center whitespace-normal
            rounded-[20px] bg-[#2C2D4A] px-4 py-3 text-[18px] text-white shadow-lg"
                                        >
                                            {options1.find((o) => o.value === option.value)?.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {index < options.length - 1 && (
                                <div
                                    className="mx-auto"
                                    style={{
                                        width: '675px',
                                        height: '3.66px',
                                        backgroundColor: '#353652',
                                        marginTop: '25px',
                                        marginBottom: '25px',
                                    }}
                                />
                            )}
                        </div>
                    ))}
                    <div style={{ height: '33px' }} />
                </div>
            )}
        </div>
    )
}

export default SelectTypeDesktop
