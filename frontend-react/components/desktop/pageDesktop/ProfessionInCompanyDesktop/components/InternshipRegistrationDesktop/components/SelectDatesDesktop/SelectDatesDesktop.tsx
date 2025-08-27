'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { AddIconDesktop } from '@/components/assets/iconsDesktop'
import SelectDateDesktop from './components/SelectDateDesktop'

interface SelectDatesDesktopProps {
    error?: boolean
    onErrorChange?: (value: boolean) => void
}

const SelectDatesDesktop: React.FC<SelectDatesDesktopProps> = ({ error, onErrorChange }) => {
    const [intervals, setIntervals] = useState<number[]>([Date.now()])
    const [datesErrors, setDatesErrors] = useState<boolean[]>([false])

    const handleRemove = (id: number) => {
        const index = intervals.indexOf(id)
        setIntervals((prev) => prev.filter((item) => item !== id))
        setDatesErrors((prev) => {
            const newErrors = [...prev]
            newErrors.splice(index, 1)
            onErrorChange?.(newErrors.some((e) => e))
            return newErrors
        })
    }

    const handleAdd = () => {
        setIntervals((prev) => [...prev, Date.now()])
        setDatesErrors((prev) => {
            const newErrors = [...prev, false]
            onErrorChange?.(newErrors.some((e) => e))
            return newErrors
        })
    }

    const handleErrorChange = (index: number, hasError: boolean) => {
        setDatesErrors((prev) => {
            const newErrors = [...prev]
            newErrors[index] = hasError
            onErrorChange?.(newErrors.some((e) => e))
            return newErrors
        })
    }

    return (
        <div className="mb-[25px] flex flex-col items-start gap-[31px]">
            {intervals.map((id, index) => (
                <div key={id} className="flex flex-col gap-2">
                    <div className="relative flex items-center gap-4">
                        <SelectDateDesktop
                            selectedDates={{ startDate: null, endDate: null }}
                            onChange={(range) => {
                                const hasError = !range.startDate
                                onErrorChange?.(hasError)
                            }}
                            onErrorChange={(hasError) => handleErrorChange(index, hasError)}
                            error={error}
                        />
                        <span className={`block h-[4px] w-[37px] ${error ? 'bg-[#BC8070]' : 'bg-[#878797]'}`}></span>
                        <SelectDateDesktop
                            selectedDates={{ startDate: null, endDate: null }}
                            onChange={() => {}}
                            onErrorChange={(hasError) => handleErrorChange(index, hasError)}
                            error={error}
                        />
                        {index > 0 && (
                            <button onClick={() => handleRemove(id)} className="group relative ml-4">
                                <X
                                    size={70}
                                    color={error ? '#BC8070' : '#878797'}
                                    className={error ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
                                />
                                <div
                                    className="absolute left-1/2 top-full z-10 -mt-3
                                    -translate-x-[40px] opacity-0 transition-opacity duration-200 
                                    group-hover:opacity-100"
                                >
                                    <div
                                        className="flex h-[77px] w-[339px] items-center justify-center 
                                        whitespace-nowrap rounded-[50px] 
                                        bg-[url('/background/delete-dates-desktop.png')] bg-cover bg-no-repeat 
                                        pb-[14px] pt-[30px] text-[21px] text-white"
                                    >
                                        Удалить интервал дат
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                    {error && <p className="text20px_desktop font-medium text-[#BC8070]">Выберите даты стажировки</p>}
                </div>
            ))}
            <button
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-[92px] border border-transparent px-[10px]"
                style={{
                    width: '480px',
                    height: '60px',
                    backgroundColor: 'rgba(53, 54, 82, 0.8)',
                }}
            >
                <AddIconDesktop className="w-[39px] h-[39px]" />
                <span className="text24px_desktop font-medium text-[#878797]">Добавить интервал стажировки</span>
            </button>
        </div>
    )
}

export default SelectDatesDesktop
