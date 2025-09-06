'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ISelectOption {
    value: string
    label: string
}

interface ISelectTypeAdressProps {
  onTypeChange: (types: string[]) => void
  error?: boolean
  onValidationChange?: (isValid: boolean) => void
}

const SelectTypeAddressDesktop: React.FC<ISelectTypeAdressProps> = ({ onTypeChange, onValidationChange, error = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const selectRef = useRef<HTMLDivElement>(null)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

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
        { value: 'tirazhnaya_150_office_204', label: 'г. Минск, ул. Тиражная 150, офис 204' },
        { value: 'surganova_1_corpus_2', label: 'г. Минск, ул. Сурганова 1, корпус 2' },
    ]

    return (
        <div className="relative z-[1] w-[clamp(450px,90%,918px)]" ref={selectRef}>
            <Button
                variant={'select_internship_btn_desktop'}
                size={'select_address_btn_desktop'}
                 onClick={handleSelectToggle}
                 className={cn(
                         'flex items-center justify-between px-[45px]',
                         error
                           ? 'border-[rgba(188,128,112,1)] text-[rgba(188,128,112,0.6)]'
                           : isOpen || selectedOption
                           ? 'border-white text-white'
                           : 'border-[#878797] text-[#878797]'
                       )}
            >
                {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Выберите адрес'}

                <ChevronDownIconDesktop
                    color="rgba(255,255,255,0.6) "
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px]  ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>
    
            {isOpen && (
                <div
                    className="absolute top-[96px] z-[9999] flex w-[clamp(450px,90%,908px)] flex-col rounded-[44px] border-[3.5px] border-[#878797] bg-[#1F203F] px-[60px] pt-[37px]"
                   >
                    {options.map((option, index) => (
                        <div key={option.value}>
                            <button
                                type="button"
                                className={`text33px_desktop w-full pl-[58px] text-left font-medium transition-colors duration-200 ${selectedOption === option.value ? 'text-white' : 'text-[#878797]'}
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
                                <div className="my-[35px] h-px w-full bg-[#878797] px-[22px]" />
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
