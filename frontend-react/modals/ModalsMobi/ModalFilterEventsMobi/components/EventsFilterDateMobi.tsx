import React, { useState } from 'react'
import {
    ChevronDownIconMobi,
    LineDateMobi,
    CalendarIconsMobi,
    CheckedBoxIconMobi,
    QuestionMarkMobi,
} from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'

interface ISelectItem {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

const EventsSelectSearchDateMobi = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [openCalendars, setOpenCalendars] = useState<{ from: boolean; to: boolean }>({
        from: false,
        to: false,
    })
    const [dates, setDates] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    })

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

    const handleInputChange = (key: DateKey, value: string) => {
        const formattedValue = autoFormatDate(value)

        setInputValues((prev) => ({
            ...prev,
            [key]: formattedValue,
        }))

        if (isValidDate(formattedValue)) {
            const parsedDate = parseDate(formattedValue)
            setDates((prev) => ({
                ...prev,
                [key]: parsedDate,
            }))
        }
    }

    const isValidDate = (dateStr: string): boolean => {
        const dateRegex = /^\d{2}.\d{2}.\d{4}$/
        if (!dateRegex.test(dateStr)) return false

        const [day, month, year] = dateStr.split('.').map(Number)
        const parsedDate = new Date(year, month - 1, day)

        return !isNaN(parsedDate.getTime())
    }

    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split('.').map(Number)
        return new Date(year, month - 1, day)
    }

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    const toggleCalendar = (key: 'from' | 'to') => {
        setOpenCalendars((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    const handleDateChange = (key: 'from' | 'to', newDate: Date | undefined) => {
        setDates((prev) => ({
            ...prev,
            [key]: newDate,
        }))
        setInputValues((prev) => ({
            ...prev,
            [key]: newDate ? autoFormatDate(newDate.toLocaleDateString('ru-RU')) : '',
        }))
        setOpenCalendars((prev) => ({
            ...prev,
            [key]: false,
        }))
    }

    const [selected, setSelected] = useState<string | null>(null)

    const handleLabelSelect = (label: string) => {
        setSelected(label)
    }

    return (
        // <div className="relative z-[3]">
        //     <Button
        //         variant={'select_btn_desktop'}
        //         size={'select_btn_desktop_events'}
        //         onClick={handleSelectToggle}
        //         className={` ${isOpen ? ' bg-gradient-desktop' : 'bg-[#101030]'}`}
        //     >
        //         Дата
        //         <ChevronDownIconMobi
        //             className={`h-[15px] w-[27px] transition-transform  duration-200 2xl:w-[20px] ${isOpen ? 'rotate-180' : ''}`}
        //         />
        //     </Button>
        //     {isOpen && (
        //         <div
        //             className="3xl:w-[300px] absolute right-0 top-[80px] z-50 w-[430px] rounded-[42px] p-[2px] 2xl:w-[270px]"
        //             style={{
        //                 background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
        //             }}
        //         >
        //             <div className="relative flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
        //                 <div className="custom-grey flex items-center justify-between">
        //                     {/* Календарь "От" */}
        //                     <div className="relative flex flex-col">
        //                         <p>От</p>
        //                         <div
        //                             className="desktop 3xl:w-[120px] flex h-[50px] w-[178px] items-center justify-center gap-1 rounded-[42px] border border-[#878797] 2xl:w-[110px]"
        //                             onClick={() => toggleCalendar('from')}
        //                             onKeyDown={(e) => {
        //                                 if (e.key === 'Enter' || e.key === ' ') {
        //                                     toggleCalendar('from')
        //                                 }
        //                             }}
        //                             role="button"
        //                             tabIndex={0}
        //                         >
        //                             <CalendarIconsMobi />
        //                             <input
        //                                 type="text"
        //                                 value={inputValues.from}
        //                                 placeholder="__.__.____"
        //                                 onChange={(e) => handleInputChange('from', e.target.value)}
        //                                 onFocus={() => setOpenCalendars((prev) => ({ ...prev, from: true }))}
        //                                 className="4xl:text-2xl 3xl:text-xl w-[81px] border-none bg-transparent text-[18px] outline-none placeholder:text-gray-500 2xl:w-[75px] 2xl:text-lg"
        //                             />
        //                         </div>
        //                         {openCalendars.from && (
        //                             <div className="absolute left-0 top-full z-20 mt-2">
        //                                 <Calendar
        //                                     mode="single"
        //                                     selected={dates.from || undefined}
        //                                     onSelect={(date) => handleDateChange('from', date)}
        //                                     className="size-full rounded-[50px] border-[#878797] bg-[#353652] shadow-lg"
        //                                 />
        //                             </div>
        //                         )}
        //                     </div>

        //                     <LineDateMobi className="mt-5" />

        //                     {/* Календарь "До" */}
        //                     <div className="relative flex flex-col">
        //                         <p>До</p>
        //                         <div
        //                             className="desktop 3xl:w-[120px] flex h-[50px] w-[178px] items-center justify-center gap-1 rounded-[42px] border border-[#878797] 2xl:w-[110px]"
        //                             onClick={() => toggleCalendar('to')}
        //                             onKeyDown={(e) => {
        //                                 if (e.key === 'Enter' || e.key === ' ') {
        //                                     toggleCalendar('to')
        //                                 }
        //                             }}
        //                             role="button"
        //                             tabIndex={0}
        //                         >
        //                             <CalendarIconsMobi />
        //                             <input
        //                                 type="text"
        //                                 value={inputValues.to}
        //                                 placeholder="__.__.____"
        //                                 onChange={(e) => handleInputChange('to', e.target.value)}
        //                                 onFocus={() => setOpenCalendars((prev) => ({ ...prev, from: true }))}
        //                                 className="4xl:text-2xl 3xl:text-xl w-[81px] border-none bg-transparent text-[18px] outline-none placeholder:text-gray-500 2xl:w-[75px] 2xl:text-lg"
        //                             />
        //                         </div>
        //                         {openCalendars.to && (
        //                             <div className="absolute right-0 top-full z-20 mt-2">
        //                                 <Calendar
        //                                     mode="single"
        //                                     selected={dates.to}
        //                                     onSelect={(date) => handleDateChange('to', date)}
        //                                     className="size-full rounded-[50px] border-[#878797] bg-[#353652] shadow-lg"
        //                                 />
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //                 {/* Кнопки */}
        //                 <Button
        //                     variant={'hover_button_date'}
        //                     size={'hover_button_date_desktop'}
        //                     onClick={handleSelectToggle}
        //                 >
        //                     Сегодня
        //                 </Button>
        //                 <Button
        //                     variant={'hover_button_date'}
        //                     size={'hover_button_date_desktop'}
        //                     onClick={handleSelectToggle}
        //                 >
        //                     Завтра
        //                 </Button>
        //                 <Button
        //                     variant={'hover_button_date'}
        //                     size={'hover_button_date_desktop'}
        //                     onClick={handleSelectToggle}
        //                 >
        //                     На этой неделе
        //                 </Button>
        //                 <Button
        //                     variant={'hover_button_date'}
        //                     size={'hover_button_date_desktop'}
        //                     onClick={handleSelectToggle}
        //                 >
        //                     В этом месяце
        //                 </Button>
        //             </div>
        //         </div>
        //     )}
        // </div>
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

            <div className="flex items-center justify-between gap-2">
                <div className="flex h-[48px] w-[155px] items-center gap-2 rounded-full border-2 border-[#878797] px-3 py-2">
                    <CalendarIconsMobi />
                    <input
                        type="text"
                        value={inputValues.from}
                        placeholder="__.__.____"
                        onChange={(e) => handleInputChange('from', e.target.value)}
                        className="w-full bg-transparent text-[16px] font-semibold leading-[20px] text-[#878797] outline-none placeholder:text-[#878797]"
                    />
                </div>

                <span className="text-[#878797]">–</span>

                <div className="flex h-[48px] w-[155px] items-center gap-2 rounded-full border-2 border-[#878797] px-3 py-2">
                    <CalendarIconsMobi />
                    <input
                        type="text"
                        value={inputValues.to}
                        placeholder="__.__.____"
                        onChange={(e) => handleInputChange('to', e.target.value)}
                        className="w-full bg-transparent text-[16px] font-semibold leading-[20px] text-[#878797] outline-none placeholder:text-[#878797]"
                    />
                </div>
            </div>
        </div>
    )
}

const SelectItem = React.forwardRef<HTMLDivElement, ISelectItem>(
    ({ children, isChecked, onClick, ...props }, forwardedRef) => {
        return (
            <div
                className={`relative z-[3] flex cursor-pointer items-center justify-between rounded-[18px] p-[15px] text-[15px] font-medium ${
                    isChecked ? 'bg-[#5F4AF30F] text-white' : 'bg-transparent text-[#878797]'
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
                    <div className="pl-[14px]">{children}</div>
                </div>
                <div className="justify-items-end">
                    <QuestionMarkMobi />
                </div>
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchDateMobi
