'use client'
import React, { useState, useEffect, useRef } from 'react'
import { CheckedBoxIconMobi, FiltersIconMobi } from '@/components/assets/iconsMobi'

interface ISelectItem {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
    className?: string
}

interface ISelectOption {
    value: string
    label: string
}

interface ProfessionsSelectMobiProps {
    selectedCategories: string[]
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const ProfessionsSelectMobi: React.FC<ProfessionsSelectMobiProps> = ({ selectedCategories, setSelectedCategories }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const toggleOption = (value: string) => {
        setSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
        )
    }

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.body.style.overflow = ''
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const options: ISelectOption[] = [
        { value: 'IT-отрасль', label: 'IT-отрасль' },
        { value: 'Здравоохранение', label: 'Здравоохранение' },
        { value: 'Искусство', label: 'Искусство' },
        { value: 'Спорт', label: 'Спорт' },
        { value: 'Отрасль 5', label: 'Отрасль 5' },
        { value: 'Отрасль 6', label: 'Отрасль 6' },
        { value: 'Отрасль 7', label: 'Отрасль 7' },
        { value: 'Отрасль 8', label: 'Отрасль 8' },
        { value: 'Отрасль 9', label: 'Отрасль 9' },
    ]

    const [isFilterActive, setIsFilterActive] = useState(false)

    const handleFilterIconClick = () => {
        setIsFilterActive(!isFilterActive)
    }

    const clearSelection = () => {
        setSelectedCategories([])
    }

    const selected = options.filter((o) => selectedCategories.includes(o.value))
    const unselected = options.filter((o) => !selectedCategories.includes(o.value))

    return (
        <div className="relative z-[3]" ref={selectRef}>
            <FiltersIconMobi
                className={`size-[24px] text-white`}
                onClick={() => {
                    handleFilterIconClick()
                    handleSelectToggle()
                }}
            />
            {isOpen && (
                <div className="fixed inset-0 z-50" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <div ref={selectRef} className="fixed left-0 top-0 z-50 w-full">
                        <div className="flex flex-col gap-1 rounded-b-[40px] bg-[#1F203F] px-[14px] pb-[18px]">
                            <div className="mb-[34px] mt-[30px] flex items-center justify-between px-2 text-white">
                                <span className="text-3xl font-semibold leading-[20px]">Выберите отрасль</span>
                                <button
                                    className="text-base font-medium leading-[15px] text-[#878797] underline"
                                    onClick={clearSelection}
                                >
                                    Очистить
                                </button>
                            </div>
                            <div
                                className="scrollbar-thin scrollbar-thumb-[#878797] scrollbar-track-transparent mobi-scroll flex max-h-[calc(6*62px)] flex-col overflow-y-auto scroll-smooth pr-[8px]"
                                style={{
                                    scrollbarGutter: 'stable',
                                }}
                            >
                                {selected.length > 0 && (
                                    <>
                                        {' '}
                                        <div className="mb-1 text-base text-[#878797]">Выбранные</div>
                                        {selected.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                isChecked={selectedCategories.includes(option.value)}
                                                onClick={() => toggleOption(option.value)}
                                                className="translate-y-0 opacity-100 transition-all duration-300 ease-out"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                        {unselected.length > 0 && selected.length > 0 && selected.length !== 5 && (
                                            <div className="mb-1 mt-5 text-base text-[#878797]">Остальные</div>
                                        )}
                                    </>
                                )}
                                {unselected.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        isChecked={false}
                                        onClick={() => toggleOption(option.value)}
                                        className="translate-y-0 opacity-100 transition-all duration-300 ease-out"
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
    ({ children, isChecked, onClick, className = '', ...props }, forwardedRef) => {
        return (
            <div
                className={`relative z-[3] flex cursor-pointer items-center gap-[20px] p-[16px] text-3xl font-medium leading-[20px] ${
                    isChecked
                        ? 'mb-[10px] rounded-[18px] bg-[rgba(95,74,243,0.06)] text-white'
                        : 'mb-[10px] bg-transparent text-[#878797]'
                } ${className ?? ''}`}
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
