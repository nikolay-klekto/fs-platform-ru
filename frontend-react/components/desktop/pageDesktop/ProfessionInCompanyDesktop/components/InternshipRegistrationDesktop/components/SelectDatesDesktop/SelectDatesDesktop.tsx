'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { AddDesktop } from '@/components/assets/iconsDesktop'
import SelectDateDesktop from './components/SelectDateDesktop'

interface SelectDatesDesktopProps {
    error?: boolean
}

const SelectDatesDesktop: React.FC<SelectDatesDesktopProps> = ({ error }) => {
    const [intervals, setIntervals] = useState<number[]>([Date.now()])

    const handleRemove = (id: number) => {
        setIntervals((prev) => prev.filter((item) => item !== id))
    }

    const handleAdd = () => {
        setIntervals((prev) => [...prev, Date.now()])
    }

    return (
        <div className="flex flex-col gap-6 mt-[41px] mb-[25px] items-start">
            {intervals.map((id, index) => (
                <div key={id} className="flex flex-col gap-2">
                    <div className="relative flex items-center gap-4">
                        {/* первый календарь */}
                        <SelectDateDesktop
                            selectedDates={{ startDate: null, endDate: null }}
                            onChange={(range) => console.log('Выбранные даты:', range)}
                            error={error}
                        />

                        {/* линия */}
                        <span className={`block h-[4px] w-[37px] ${error ? 'bg-[#BC8070]' : 'bg-[#878797]'}`}></span>

                        {/* второй календарь */}
                        <SelectDateDesktop
                            selectedDates={{ startDate: null, endDate: null }}
                            onChange={(range) => console.log('Выбранные даты:', range)}
                            error={error}
                        />

                        {/* крестик  */}
                        {index > 0 && (
                            <button onClick={() => handleRemove(id)} className="ml-4 relative group">
                                <X
                                    size={40}
                                    color={error ? '#BC8070' : '#878797'}
                                    className={error ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
                                />

                                {/* тултип */}
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

                    {/* подпись об ошибке */}
                    {error && <p className="text-[20px] font-medium text-[#BC8070]">Выберите даты стажировки</p>}
                </div>
            ))}

            {/* кнопка добавить интервал */}
            <button
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-[92px] border border-transparent px-[10px]"
                style={{
                    width: '480px',
                    height: '60px',
                    backgroundColor: 'rgba(53, 54, 82, 0.8)',
                }}
            >
                <AddDesktop className="w-[39px] h-[39px]" />
                <span className="text-[24px] font-medium text-[#878797]">Добавить интервал стажировки</span>
            </button>
        </div>
    )
}

export default SelectDatesDesktop
