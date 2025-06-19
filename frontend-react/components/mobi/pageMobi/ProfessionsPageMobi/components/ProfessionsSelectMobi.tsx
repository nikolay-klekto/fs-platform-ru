'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CheckedBoxIconMobi, FiltersIconMobi } from '@/components/assets/iconsMobi'
import { GradientButtonMobi } from '@/components/mobi/shared/GradientButtonMobi'

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
    const [pendingSelectedCategories, setPendingSelectedCategories] = useState(selectedCategories)

    // const toggleOption = (value: string) => {
    //     setSelectedCategories((prev) =>
    //         prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
    //     )
    // }
    const toggleOption = (value: string) => {
        setPendingSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
        )
    }

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        },
        [selectRef, setIsOpen],
    )

    useEffect(() => {
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
    }, [isOpen, handleClickOutside])

    const options: ISelectOption[] = [
        { value: 'IT-отрасль', label: 'IT-отрасль' },
        { value: 'Здравоохранение', label: 'Здравоохранение' },
        { value: 'Искусство', label: 'Искусство' },
        { value: 'Спорт', label: 'Спорт' },
        { value: 'Отрасль 5', label: 'Отрасль 5' },
        { value: 'Отрасль 6', label: 'Отрасль 6' },
    ]

    const clearSelection = () => {
        setPendingSelectedCategories([])
        setSelectedCategories([])
    }

    const selected = options.filter((o) => pendingSelectedCategories.includes(o.value))
    const unselected = options.filter((o) => !pendingSelectedCategories.includes(o.value))

    return (
        <div className="relative z-[3]">
            <FiltersIconMobi
                className={`size-[24px] ${selectedCategories.length > 0 ? 'text-white' : 'text-[#878797]'} md:size-[30px]`}
                onClick={() => {
                    handleSelectToggle()
                }}
            />
            {isOpen && (
                <div className="fixed inset-0 z-[1] flex flex-col bg-black/70 ">
                    <div className="fixed left-0 top-0 z-50 size-full shadow-2xl">
                        <div
                            ref={selectRef}
                            className="relative flex h-[92vh] flex-col gap-1 rounded-b-[40px] bg-[#1F203F] px-[14px] pb-[18px] shadow-2xl"
                        >
                            <div className="mb-[10px] mt-[30px] flex items-center justify-between px-2 text-white">
                                <span className="text-3xl font-semibold leading-[20px]">Выберите отрасль</span>
                                <button
                                    className="text-base font-medium leading-[15px] text-[#878797] underline"
                                    onClick={clearSelection}
                                >
                                    Очистить
                                </button>
                            </div>
                            <div
                                className="scrollbar-thin scrollbar-thumb-[#878797] scrollbar-track-transparent mobi-scroll flex max-h-[calc(8*62px)] flex-col overflow-y-auto scroll-smooth pr-[8px]"
                                style={{
                                    minHeight: '420px',
                                    maxHeight: '500px',
                                    scrollbarGutter: 'stable',
                                }}
                            >
                                {' '}
                                <div
                                    className={`mb-1 pl-4 text-base text-[#878797] ${selected.length === 0 ? 'invisible' : ''}`}
                                >
                                    Выбранные
                                </div>
                                {selected.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        isChecked={pendingSelectedCategories.includes(option.value)}
                                        onClick={() => toggleOption(option.value)}
                                        className="translate-y-0 opacity-100 transition-all duration-300 ease-out"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                                {unselected.length > 0 && selected.length > 0 && (
                                    <div className="mb-1 pl-4 text-base text-[#878797]">Другие отрасли</div>
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
                            <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-4 pb-[23px]">
                                <GradientButtonMobi
                                    onClick={() => {
                                        setSelectedCategories(pendingSelectedCategories)
                                        setIsOpen(false)
                                    }}
                                />
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
