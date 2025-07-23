'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIconDesktop, SearchIconDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

interface EventsSelectSearchCityDesktopProps {
    selected: string[]
    onChange: (newSelected: string[]) => void
}

interface ISelectOption {
    value: string
    label: string
}

const EventsSelectSearchCityDesktop: React.FC<EventsSelectSearchCityDesktopProps> = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const options: ISelectOption[] = [
        { value: 'brest', label: 'Брест' },
        { value: 'vitebsk', label: 'Витебск' },
        { value: 'gomel', label: 'Гомель' },
        { value: 'grodno', label: 'Гродно' },
        { value: 'mogilev', label: 'Могилев' },
        { value: 'minsk', label: 'Минск' },
    ]

    const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))

    const toggleOption = (value: string) => {
        const next = selected.includes(value) ? selected.filter((opt) => opt !== value) : [...selected, value]
        onChange(next)
    }

    return (
        <div className="relative z-[3]" ref={dropdownRef}>
            <Button
                variant="select_btn_desktop"
                size="select_btn_desktop_date"
                onClick={handleSelectToggle}
                className={`${isOpen ? 'bg-gradient-desktop' : 'bg-[#101030]'}`}
            >
                Город
                <ChevronDownIconDesktop
                    className={`h-[15px] w-[27px] transition-transform duration-200 2xl:w-[20px] ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {isOpen && (
                <div
                    className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[400px] rounded-[42px] p-[2px] 2xl:w-[270px]"
                    style={{
                        background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                    }}
                >
                    <div className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                        <div className="border-white-300 flex items-center rounded-[50px] border px-3">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-18px flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <SearchIconDesktop
                                className="mr-2 size-4 shrink-0 opacity-50"
                                onClick={() => console.log('Search icon clicked!')}
                            />
                        </div>

                        {filteredOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                isChecked={selected.includes(option.value)}
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

interface ISelectItemProps {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItemProps>(({ children, isChecked, onClick }, ref) => (
    <div
        ref={ref}
        onClick={onClick}
        role="menuitem"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
            }
        }}
        className={`hover:border-hover text-[18px] font-medium relative z-[3] flex cursor-pointer items-center justify-between p-[15px] text-white ${
            isChecked ? 'border-selected border-y-2 bg-[#28295B]' : 'bg-transparent'
        }`}
    >
        <div className="pl-[14px]">{children}</div>
    </div>
))

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchCityDesktop
