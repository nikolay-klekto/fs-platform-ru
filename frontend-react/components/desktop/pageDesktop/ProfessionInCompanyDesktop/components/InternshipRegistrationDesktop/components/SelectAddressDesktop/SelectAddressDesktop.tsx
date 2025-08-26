'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

interface ISelectOption {
    value: string
    label: string
}

const SelectTypeAddressDesktop = ({ onAddressChange }: { onAddressChange: (addresses: string[]) => void }) => {
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
            onAddressChange([selectedOption])
        }
    }, [selectedOption, onAddressChange])

    const options: ISelectOption[] = [
        { value: 'tirazhnaya_150_office_204', label: 'г. Минск, ул. Тиражная 150, офис 204' },
        { value: 'surganova_1_corpus_2', label: 'г. Минск, ул. Сурганова 1, корпус 2' },
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
                {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Выберите адрес'}

                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {/* Дропдаун */}
            {isOpen && (
                <div
                    className="absolute top-[96px] z-[9999] flex flex-col bg-[#1F203F] px-[60px] pt-[37px]"
                    style={{
                        width: '908px',
                        border: '3.5px solid #878797',
                        borderRadius: '44px',
                    }}
                >
                    {options.map((option, index) => (
                        <div key={option.value}>
                            <button
                                type="button"
                                className={`w-full pl-[58px] text-left text-[32px] font-medium transition-colors duration-200 ${selectedOption === option.value ? 'text-white' : 'text-[#878797]'}
                  hover:text-white
                  ${index === 0 ? 'mt-0' : ''}`}
                                onClick={() => {
                                    setSelectedOption(option.value)
                                    setIsOpen(false)
                                }}
                            >
                                {option.label}
                            </button>
                            {index < options.length - 1 && (
                                <div className="px-[22px] my-[35px] h-[1px] w-full bg-[#878797]" />
                            )}
                        </div>
                    ))}
                    <div className="h-[50px]" />{' '}
                </div>
            )}
        </div>
    )
}

export default SelectTypeAddressDesktop
