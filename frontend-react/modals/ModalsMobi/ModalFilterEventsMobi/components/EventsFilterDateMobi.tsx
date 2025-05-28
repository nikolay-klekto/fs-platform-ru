import React, { useState } from 'react'
import {
    ChevronDownIconMobi,
    LineDateMobi,
    CalendarIconsMobi,
    CheckedBoxIconMobi,
    QuestionMarkMobi,
} from '@/components/assets/iconsMobi'

import { Calendar } from '@/components/ui/calendar'

// interface ISelectItem {
//     value: string
//     children: React.ReactNode
//     isChecked: boolean
//     onClick: () => void
// }

const EventsSelectSearchDateMobi = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const [dates, setDates] = useState<{ from?: Date; to?: Date }>({})

    // const [isOpen, setIsOpen] = useState(false)
    // const [openCalendars, setOpenCalendars] = useState<{ from: boolean; to: boolean }>({
    //     from: false,
    //     to: false,
    // })
    // const [dates, setDates] = useState<{ from: Date | undefined; to: Date | undefined }>({
    //     from: undefined,
    //     to: undefined,
    // })

    const [inputValues, setInputValues] = useState<{ from: string; to: string }>({
        from: '',
        to: '',
    })

    const autoFormatDate = (value: string): string => {
        const numbersOnly = value.replace(/\D/g, '')

        const day = numbersOnly.slice(0, 2)
        const month = numbersOnly.slice(2, 4)
        const year = numbersOnly.slice(4, 8)

        let formattedDate = day
        if (month) formattedDate += `.${month}`
        if (year) formattedDate += `.${year}`

        return formattedDate
    }

    type DateKey = 'from' | 'to'

    // const handleInputChange = (key: DateKey, value: string) => {
    //     const formattedValue = autoFormatDate(value)

    //     setInputValues((prev) => ({
    //         ...prev,
    //         [key]: formattedValue,
    //     }))

    //     // if (isValidDate(formattedValue)) {
    //     //     const parsedDate = parseDate(formattedValue)
    //     //     setDates((prev) => ({
    //     //         ...prev,
    //     //         [key]: parsedDate,
    //     //     }))
    //     // }
    // }

    // const isValidDate = (dateStr: string): boolean => {
    //     const dateRegex = /^\d{2}.\d{2}.\d{4}$/
    //     if (!dateRegex.test(dateStr)) return false

    //     const [day, month, year] = dateStr.split('.').map(Number)
    //     const parsedDate = new Date(year, month - 1, day)

    //     return !isNaN(parsedDate.getTime())
    // }

    // const parseDate = (dateStr: string): Date => {
    //     const [day, month, year] = dateStr.split('.').map(Number)
    //     return new Date(year, month - 1, day)
    // }

    // const handleSelectToggle = () => {
    //     setIsOpen((prev) => !prev)
    // }

    // const toggleCalendar = (key: 'from' | 'to') => {
    //     setOpenCalendars((prev) => ({
    //         ...prev,
    //         [key]: !prev[key],
    //     }))
    // }

    // const handleDateChange = (key: 'from' | 'to', newDate: Date | undefined) => {
    //     setDates((prev) => ({
    //         ...prev,
    //         [key]: newDate,
    //     }))
    //     setInputValues((prev) => ({
    //         ...prev,
    //         [key]: newDate ? autoFormatDate(newDate.toLocaleDateString('ru-RU')) : '',
    //     }))
    //     setOpenCalendars((prev) => ({
    //         ...prev,
    //         [key]: false,
    //     }))
    // }

    const handleLabelSelect = (label: string) => {
        setSelected(label)

        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)

        let from: Date = today
        let to: Date = today

        if (label === 'Сегодня') {
            from = to = today
        } else if (label === 'Завтра') {
            from = to = tomorrow
        } else if (label === 'Эта неделя') {
            const day = today.getDay()
            from = new Date(today)
            from.setDate(today.getDate() - day + 1)
            to = new Date(today)
            to.setDate(from.getDate() + 6)
        } else if (label === 'В этом месяце') {
            from = new Date(today.getFullYear(), today.getMonth(), 1)
            to = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        }

        setDates({ from, to })
        if (from && to) setIsCalendarOpen(false)
        setInputValues({
            from: autoFormatDate(from.toLocaleDateString('ru-RU')),
            to: autoFormatDate(to.toLocaleDateString('ru-RU')),
        })
    }
    const parseDate = (dateStr: string): Date | undefined => {
        const [day, month, year] = dateStr.split('.').map(Number)
        const d = new Date(year, month - 1, day)
        return isNaN(d.getTime()) ? undefined : d
    }

    const handleInputChange = (key: DateKey, value: string) => {
        const formattedValue = autoFormatDate(value)

        setInputValues((prev) => ({
            ...prev,
            [key]: formattedValue,
        }))

        const parsed = parseDate(formattedValue)
        if (parsed) {
            setDates((prev) => ({
                ...prev,
                [key]: parsed,
            }))
            setSelected(null)
        }
    }

    function useResponsiveRange(min: number, max: number) {
        const [isInRange, setIsInRange] = useState(false)

        React.useEffect(() => {
            const handler = () => {
                const width = window.innerWidth
                setIsInRange(width >= min && width <= max)
            }
            handler()
            window.addEventListener('resize', handler)
            return () => window.removeEventListener('resize', handler)
        }, [min, max])

        return isInRange
    }

    const showTwoMonths = useResponsiveRange(426, 768)

    const [selected, setSelected] = useState<string | null>(null)

    // const handleLabelSelect = (label: string) => {
    //     setSelected(label)
    // }

    return (
        <div className="mb-8">
            <h3 className="mb-4 text-[16px] font-semibold text-white">Дата</h3>

            <div className="mb-4 flex flex-wrap gap-x-[16px] gap-y-[8px]">
                {['Сегодня', 'Завтра', 'Эта неделя', 'В этом месяце'].map((label) => (
                    <button
                        key={label}
                        className={`flex h-[33px] items-center justify-center gap-[10px] rounded-[40px] border border-transparent px-4 py-2 text-[14px] font-medium leading-[17px] ${
                            selected === label
                                ? 'border border-white bg-[#353652] text-white'
                                : 'bg-[#1F203F] text-[#878797]'
                        }`}
                        onClick={() => handleLabelSelect(label)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p className="mb-2 text-[12px] leading-[15px] text-[#353652]">Или</p>

            <div className="flex items-center justify-start gap-2">
                <div className="flex h-[48px] w-[155px] items-center gap-[10px] rounded-full border-2 border-[#878797] px-[12px] py-[8px]">
                    <CalendarIconsMobi className="size-[30px]" />
                    <input
                        type="text"
                        value={inputValues.from}
                        placeholder="__.__.____"
                        onChange={(e) => handleInputChange('from', e.target.value)}
                        className="w-full bg-transparent text-[16px] font-semibold leading-[20px] text-[#878797] outline-none placeholder:text-[#878797]"
                        onFocus={() => setIsCalendarOpen(true)}
                    />
                </div>
                <div className="w-[22px] border-t-2 border-[#878797]"></div>

                <div className="flex h-[48px] w-[155px] items-center gap-[10px] rounded-full border-2 border-[#878797] px-[12px] py-[8px]">
                    <CalendarIconsMobi className="size-[30px]" />
                    <input
                        type="text"
                        value={inputValues.to}
                        placeholder="__.__.____"
                        onChange={(e) => handleInputChange('to', e.target.value)}
                        className="w-full bg-transparent text-[16px] font-semibold leading-[20px] text-[#878797] outline-none placeholder:text-[#878797]"
                        onFocus={() => setIsCalendarOpen(true)}
                    />
                </div>
            </div>

            {isCalendarOpen && (
                <div className="mt-4 rounded-[24px] bg-[#353652] p-4 shadow-lg transition-all duration-200 ease-in-out">
                    <Calendar
                        mode="range"
                        numberOfMonths={showTwoMonths ? 2 : 1}
                        selected={dates}
                        onSelect={(range) => {
                            setDates(range ?? {})
                            if (range?.from) {
                                setInputValues((prev) => ({
                                    ...prev,
                                    from: autoFormatDate(range.from.toLocaleDateString('ru-RU')),
                                    to: range.to ? autoFormatDate(range.to.toLocaleDateString('ru-RU')) : '',
                                }))
                                if (range.to) setIsCalendarOpen(false)
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}

// const SelectItem = React.forwardRef<HTMLDivElement, ISelectItem>(
//     ({ children, isChecked, onClick, ...props }, forwardedRef) => {
//         return (
//             <div
//                 className={`relative z-[3] flex cursor-pointer items-center justify-between rounded-[18px] p-[15px] text-[15px] font-medium ${
//                     isChecked ? 'bg-[#5F4AF30F] text-white' : 'bg-transparent text-[#878797]'
//                 }`}
//                 {...props}
//                 ref={forwardedRef}
//                 onClick={onClick}
//                 role="menuitem"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                         e.preventDefault()
//                         onClick()
//                     }
//                 }}
//             >
//                 <div className="flex ">
//                     <div className="relative flex size-[20px] items-center justify-center">
//                         <input
//                             type="checkbox"
//                             checked={isChecked}
//                             onChange={(e) => {
//                                 e.stopPropagation()
//                                 onClick()
//                             }}
//                             className="absolute inset-0 size-full cursor-pointer opacity-0"
//                         />
//                         {isChecked ? (
//                             <CheckedBoxIconMobi
//                                 style={{
//                                     position: 'absolute',
//                                     width: '30px',
//                                     height: '25px',
//                                 }}
//                             />
//                         ) : (
//                             <div
//                                 className="absolute inset-0 z-[3] rounded-[3px]"
//                                 style={{
//                                     border: '2px solid #878797',
//                                     background: 'transparent',
//                                 }}
//                             ></div>
//                         )}
//                     </div>
//                     <div className="pl-[14px]">{children}</div>
//                 </div>
//                 <div className="justify-items-end">
//                     <QuestionMarkMobi />
//                 </div>
//             </div>
//         )
//     },
// )

// SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchDateMobi
