'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop, QuestionMark } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

interface ISelectOption {
    value: string
    label: string
}

const InternshipSelectTypeDesktop = ({ onTypeChange }: { onTypeChange: (types: string[]) => void }) => {
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

    return (
        <div className="relative" ref={selectRef}>
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
                    className="absolute top-[96px] z-50 flex flex-col overflow-hidden bg-[#1F203F]"
                    style={{
                        width: '751px',
                        height: '205px',
                        border: '3.66px solid #878797',
                        borderRadius: '44px',
                    }}
                >
                    {options.map((option, index) => (
                        <div key={option.value}>
                            {/* Опция */}
                            <div
                                className={`flex items-center justify-between`}
                                style={{
                                    marginTop: index === 0 ? '40px' : undefined,
                                    paddingBottom: index === options.length - 1 ? '33px' : undefined,
                                    paddingLeft: '42px',
                                    paddingRight: '25px',
                                }}
                            >
                                <button
                                    type="button"
                                    className={`text-left text-[32px] font-medium transition-colors duration-200
                    ${selectedOption === option.value ? 'text-white' : 'text-[#878797]'}
                    hover:text-white`}
                                    onClick={() => {
                                        setSelectedOption(option.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    {option.label}
                                </button>
                                <QuestionMark className="h-[40px] w-[41px]" />
                            </div>

                            {/* Разделитель */}
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
                </div>
            )}
        </div>
    )
}

export default InternshipSelectTypeDesktop
