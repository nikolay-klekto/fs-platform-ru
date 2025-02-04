import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, SearchIcon } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'
interface SelectItemProps {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

interface SelectOption {
    value: string
    label: string
}

const EventsSelectSearchCityDesktop = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleOption = (value: string) => {
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value],
        )
    }

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

    const options: SelectOption[] = [
        { value: 'brest', label: 'Брест' },
        { value: 'vitebsk', label: 'Витебск' },
        { value: 'gomel', label: 'Гомель' },
        { value: 'grodno', label: 'Гродно' },
        { value: 'mogilev', label: 'Могилев' },
        { value: 'minsk', label: 'Минск' },
    ]

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="relative z-[3]" ref={dropdownRef}>
            <Button
                variant={'select_btn_desktop'}
                size={'select_btn_desktop_date'}
                onClick={handleSelectToggle}
                className={` ${isOpen ? ' bg-gradient-desktop' : 'bg-[#101030]'}`}
            >
                Город
                <ChevronDownIcon
                    className={`h-[15px] w-[27px] transition-transform  duration-200 2xl:w-[20px] ${isOpen ? 'rotate-180' : ''}`}
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
                        <div className="flex items-center border border-white-300 rounded-[50px] px-3">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex h-11 w-full rounded-md bg-transparent py-3 text-18px outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <SearchIcon
                                className="mr-2 h-4 w-4 shrink-0 opacity-50"
                                onClick={() => console.log('Search icon clicked!')}
                            />
                        </div>
                        {filteredOptions.map((option) => (
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

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, isChecked, onClick, ...props }, forwardedRef) => {
        return (
            <div
                className={`relative z-[3] flex cursor-pointer items-center justify-between p-[15px] hover:border-hover text-white text-[18px]font-medium ${
                    isChecked ? 'bg-[#28295B] border-t-2 border-b-2 border-selected' : 'bg-transparent'
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
                <div className="flex ">
                    <div className="pl-[14px]">{children}</div>
                </div>
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchCityDesktop
