import React, { useState } from 'react'
import { ChevronDownIcon, LineDate } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'

interface SelectItemProps {
    value: string
    children: React.ReactNode
    isChecked: boolean
    onClick: () => void
}

const EventsSelectSearchDateDesktop = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="relative z-[3]">
            <Button
                variant={'select_btn_desktop'}
                size={'select_btn_desktop_events'}
                onClick={handleSelectToggle}
                className={` ${isOpen ? ' bg-gradient-desktop' : 'bg-[#101030]'}`}
            >
                Дата
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
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col ">
                                <p>Oт</p>
                                <input type="date" name="calendar" value="" />{' '}
                            </div>
                            <LineDate />
                            <div className="flex flex-col">
                                <p>До</p>
                                <input type="date" name="calendar" value="" />
                            </div>
                        </div>
                        <Button>Сегодня</Button>
                        <Button>Завтра</Button>
                        <Button>На этой неделе</Button>
                        <Button>В этом месяце</Button>
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
                            <CheckedBoxIcon
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
                    <QuestionMark />
                </div>
            </div>
        )
    },
)

SelectItem.displayName = 'SelectItem'

export default EventsSelectSearchDateDesktop
