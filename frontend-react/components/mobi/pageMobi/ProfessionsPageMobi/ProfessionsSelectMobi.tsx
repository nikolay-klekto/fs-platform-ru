'use client'
import React, { useState, useEffect, useRef } from 'react'
import { SearchIconMobi, CheckedBoxIconMobi } from '@/components/assets/iconsMobi'
import { FiltersIconMobi } from '@/components/assets/icons'

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

const ProfessionsSelectMobi = () => {
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

    const options: ISelectOption[] = [
        { value: 'IT', label: 'IT-отрасль' },
        { value: 'healthcare', label: 'Здравоохранение' },
        { value: 'art', label: 'Искусство' },
        { value: 'sport', label: 'Спорт' },
        { value: 'field5', label: 'Отрасль 5' },
        { value: 'field6', label: 'Отрасль 6' },
    ]

    const [isFilterActive, setIsFilterActive] = useState(false)

    const handleFilterIconClick = () => {
        setIsFilterActive(!isFilterActive)
    }

    const clearSelection = () => {
        setSelectedOptions([])
    }

    const [searchTerm, setSearchTerm] = useState('')

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
                <div
                    className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[337px] rounded-[42px] p-[2px] 2xl:w-[270px]"
                    style={{
                        background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                    }}
                >
                    <div className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        <div className="mb-2 flex items-center justify-between px-2 text-white">
                            <span className="text-3xl font-semibold">Отрасль профессии</span>
                            <button className="text-base text-[#878797] underline" onClick={clearSelection}>
                                Очистить
                            </button>
                        </div>

                        <div className="border-white-300 flex items-center rounded-[50px] border px-3">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-14px flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <SearchIconMobi
                                className="mr-2 size-6 shrink-0 opacity-50"
                                onClick={() => console.log('Search icon clicked!')}
                            />
                        </div>

                        {options
                            .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((option) => (
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
            )}
        </div>
    )
}

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItem>(
    ({ children, isChecked, onClick, ...props }, forwardedRef) => {
        return (
            <div
                className={`text-14px relative z-[3] flex cursor-pointer items-center gap-[14px] border-b-2 border-[#353632] p-[15px] ${
                    isChecked ? 'text-white' : 'bg-transparent text-[#878797]'
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
                {children}
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default ProfessionsSelectMobi
