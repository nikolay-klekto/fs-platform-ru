'use client'
import React, { useState } from 'react'
import { AddDesktop } from '@/components/assets/iconsDesktop'
import InternshipSelectDatesDesktop from '../IntenrshipSelectDatesDesktop/SelectDatesDesktop'

const InternshipAddDateIntervalDesktop: React.FC = () => {
    const [intervals, setIntervals] = useState<number[]>([])

    const handleClick = () => {
        setIntervals((prev) => [...prev, Date.now()]) // добавляем уникальный элемент
    }

    return (
        <div className="flex flex-col items-start gap-2">
            {/* Рендерим интервалы над кнопкой */}
            {intervals
                .slice(0)
                .reverse()
                .map((id) => (
                    <InternshipSelectDatesDesktop key={id} />
                ))}

            <button
                onClick={handleClick}
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

export default InternshipAddDateIntervalDesktop
