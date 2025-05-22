'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarProfile({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    const [selectedDate, setSelectedDate] = React.useState(new Date(1999, 8, 20))

    const handleDayClick = (day: Date | undefined) => {
        if (day) {
            setSelectedDate(day)
        }
    }

    const footer = (
        <div className="flex justify-between mt-4">
            <button
                className="text-muted-foreground text-sm px-3 py-1"
                onClick={() => setSelectedDate(new Date(1999, 8, 20))}
            >
                Отмена
            </button>
            <button
                className="bg-purple-600 text-white text-sm px-4 py-1 rounded-full"
                onClick={() =>
                    alert(`Дата сохранена: ${format(selectedDate, 'dd MMMM yyyy', { locale: ru })}`)
                }
            >
                Сохранить
            </button>
        </div>
    )

    return (
        <div className="relative bg-[#1a1a2e] rounded-lg p-4">
            <DayPicker
                showOutsideDays={showOutsideDays}
                className={cn('p-3', className)}
                classNames={{
                    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                    month: 'space-y-4',
                    caption: 'flex justify-center pt-1 relative items-center',
                    caption_label: 'text-sm font-medium text-white',
                    nav: 'space-x-1 flex items-center',
                    nav_button: cn(
                        buttonVariants({ variant: 'outline' }),
                        'h-7 w-7 bg-transparent text-white p-0 opacity-50 hover:opacity-80 border-none',
                    ),
                    nav_button_previous: 'absolute left-1',
                    nav_button_next: 'absolute right-1',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex',
                    head_cell: 'text-gray-400 rounded-md w-9 font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2',
                    cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-800/50 [&:has([aria-selected])]:bg-purple-600 [&:has([aria-selected])]:rounded-[90px] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                    day: cn(
                        buttonVariants({ variant: 'ghost' }),
                        'h-9 w-9 p-0 font-normal text-white aria-selected:opacity-100',
                    ),
                    day_range_end: 'day-range-end',
                    day_selected: cn(
                        buttonVariants({ variant: 'select_day' }),
                        'text-white bg-purple-600 rounded-[90px]',
                    ),
                    day_today: 'text-white rounded-[90px] border border-gray-500',
                    day_outside:
                        'day-outside text-gray-400 aria-selected:bg-gray-800/50 aria-selected:text-gray-400',
                    day_disabled: 'text-gray-400 opacity-50',
                    day_range_middle: 'aria-selected:bg-gray-800 aria-selected:text-white',
                    day_hidden: 'invisible',
                    ...classNames,
                }}
                components={{
                    IconLeft: ({ className, ...props }) => (
                        <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
                    ),
                    IconRight: ({ className, ...props }) => (
                        <ChevronRight className={cn('h-4 w-4', className)} {...props} />
                    ),
                }}
                locale={ru}
                mode="single"
                selected={selectedDate}
                onClick={handleDayClick}
                defaultMonth={new Date(1999, 8)}
                fromYear={1998}
                toYear={2000}
                captionLayout="dropdown"
                footer={footer}
                {...props}
            />
        </div>
    )
}

CalendarProfile.displayName = 'Calendar'

export { CalendarProfile }