'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIconDesktop, QuestionMarkIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ISelectOption {
  value: string
  label: string
}

interface ISelectTypeDesktopProps {
  onTypeChange: (types: string[]) => void
  error?: boolean
  onValidationChange?: (isValid: boolean) => void
}

const SelectTypeDesktop: React.FC<ISelectTypeDesktopProps> = ({ onTypeChange, onValidationChange, error = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

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
      value: 'observer',
      label:
        'Вы получаете стажировку\nнаблюдателя, но с рабочими задачами\nпод Ваш уровень и\nчеловеком, который\nпоможет подтянуть знания',
    },
    {
      value: 'participant',
      label:
        'На стажировке Вас ждет ментор,\nобзорные экскурсии и рабочее место,\nбез необходимости работать',
    },
  ]

  return (
    <div className="relative z-[1] w-[clamp(450px,90%,758px)]" ref={selectRef}>
      <Button
        variant={'select_internship_btn_desktop'}
        size={'select_internship_btn_desktop'}
        onClick={handleSelectToggle}
        className={cn(
          'flex items-center justify-between px-[45px] text32_desktop font-medium',
          error
            ? 'border-[rgba(188,128,112,1)] text-[rgba(188,128,112,0.6)]'
            : isOpen || selectedOption
            ? 'border-white text-white'
            : 'border-[#878797] text-[#878797]'
        )}
      >
        {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Выберите вид стажировки'}

        <ChevronDownIconDesktop
          color={error ? 'rgba(188,128,112,0.6)' : 'rgba(255,255,255,0.6)'}
          className={cn(
            'h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px]',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </Button>

      {error && (
        <p className="text20px_desktop mt-[4px] font-medium leading-[100%] text-[#BC8070]">
          Выберите вид стажировки
        </p>
      )}

      {isOpen && (
        <div
          className="absolute top-[96px] z-[9999] flex w-[751px] 2xl:w-[500px] 3xl:w-[600px] flex-col rounded-[44px] border-[3.7px] border-[#FFFFFF80] bg-[#1F203F] pl-[42px] 3xl:pl-[33px] 2xl:pl-[15px] pr-[25px] 2xl:pr-[10px]"
          >
  {options.map((option, index) => {
  const isFirst = index === 0;
  const isLast = index === options.length - 1;

  return (
    <div key={option.value}>
     <button
       type="button"
        className={cn(
          "flex font-medium items-center justify-between w-full text33px_desktop  pt-[43px] transition-all duration-200",
          "cursor-pointer",
          isFirst ? "rounded-t-[33px]" : "",
          isLast ? "rounded-b-[33px]" : "",
          "hover:bg-internship-desktop-hover"
        )}
        onClick={() => {
          setSelectedOption(option.value)
          setIsOpen(false)
        }}
      >
        <span
          className={cn(
            "text33px_desktop whitespace-nowrap font-medium text-left ",
            selectedOption === option.value ? "text-white" : "text-[#878797]",
            "transition-colors duration-200"
          )}
        >
          {option.label}
        </span>

        <div className="group relative ">
          <QuestionMarkIconDesktop className="h-[40px] w-[41px] cursor-pointer" />
          <div className="absolute left-1/2 top-full z-10 -mt-6 -translate-x-[40px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex w-[540px] items-center text-left justify-center rounded-[50px] whitespace-pre-line bg-[url('/background/internship-type-popup2.png')] bg-cover bg-no-repeat pb-[26px] pt-[23px] pl-[34px] text-[21px] text-white">
              {options1.find((o) => o.value === option.value)?.label}
            </div>
          </div>
        </div>
      </button>
      

      {index < options.length - 1 && (
        <div
          className="mx-auto"
          style={{
            width: '90%vvw',
            height: '3.7px',
            backgroundColor: '#353652',
            marginTop: '25px',
            marginBottom: '25px',
          }}
        />
      )}
    </div>
  )
})}

          <div style={{ height: '33px' }} />
        </div>
      )}
    </div>
  )
}

export default SelectTypeDesktop
