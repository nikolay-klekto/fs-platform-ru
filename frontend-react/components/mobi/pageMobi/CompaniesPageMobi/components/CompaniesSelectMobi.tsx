'use client'
import React, { useState, useEffect, useRef } from 'react'
import { CheckedBoxIconMobi, FiltersIconMobi } from '@/components/assets/iconsMobi'

interface ISelectItem {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

interface ISelectOption {
    value: string
    label: string
}

const ProfessionsSelectMobi = ({ onCategoryChange }: { onCategoryChange: (categories: string[]) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const selectRef = useRef<HTMLDivElement>(null)

    const toggleOption = (value: string) => {
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
        )
    }

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        onCategoryChange(selectedOptions)
    }, [selectedOptions, onCategoryChange])

    const options: ISelectOption[] = [
        { value: 'IT-компания', label: 'IT-компания' },
        { value: 'Здравоохранение', label: 'Здравоохранение' },
        { value: 'Искусство', label: 'Искусство' },
        { value: 'Спорт', label: 'Спорт' },
        { value: 'field5', label: 'Отрасль 5' },
        { value: 'field6', label: 'Отрасль 6' },
        { value: 'field7', label: 'Отрасль 7' },
    ]

    const [isFilterActive, setIsFilterActive] = useState(false)

    const handleFilterIconClick = () => {
        setIsFilterActive(!isFilterActive)
    }

    const clearSelection = () => {
        setSelectedOptions([])
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setIsFilterActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative z-[3]" ref={selectRef}>
            <FiltersIconMobi
                className={`size-[32px] ${isFilterActive ? 'text-white' : 'text-[#878797]'}`}
                onClick={() => {
                    handleFilterIconClick()
                    handleSelectToggle()
                }}
            />
            {isOpen && (
                <div className="fixed inset-0 z-50" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="fixed left-0 top-0 z-50 w-full rounded-[40px] ">
                        <div className="flex flex-col rounded-b-[40px] bg-[#1F203F] px-[14px] pb-[50px] pt-[18px]">
                            <div className="mb-[33px] mt-[10px] flex items-center justify-between text-white">
                                <span className="text-3xl font-semibold">Выберите отрасль</span>
                                <button className="text-base text-[#878797] underline" onClick={clearSelection}>
                                    Очистить
                                </button>
                            </div>
                            <div className="flex max-h-[325px] flex-col overflow-y-auto scroll-smooth pr-1">
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        isChecked={selectedOptions.includes(option.value)}
                                        onClick={() => toggleOption(option.value)}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItem>(
    ({ children, isChecked, onClick, ...props }, forwardedRef) => {
        return (
            <div className="pt-[2px]">
                <div
                    className={`text-15px text-medium relative z-[3] flex cursor-pointer items-center px-[16px] py-[14px] ${
                        isChecked
                            ? 'h-[51px] rounded-[18px] bg-[#5F4AF30F] py-[14px] text-white'
                            : 'bg-transparent text-[#878797]'
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
                            <CheckedBoxIconMobi
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
                            ></div>
                        )}
                    </div>
                    <div className="pl-[20px]">{children}</div>
                </div>
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default ProfessionsSelectMobi
