'use client'

import React from 'react'
import InternshipSelectDateDesktop from './ItemSelectDateDesktop/ItemSlctDtDesktop'

const InternshipDatesDesktop: React.FC = () => {
    return (
        <div className="flex flex-col">
            {/* Календари с выбором даты */}
            <div className="flex items-center gap-4 mb-[32px] ">
                <InternshipSelectDateDesktop
                    selectedDates={{ startDate: null, endDate: null }}
                    onChange={(range) => {
                        console.log('Выбранные даты:', range)
                    }}
                />
                {/* Серая линия */}
                <span className="block h-[4px] w-[37px] bg-[#878797]"></span>
                {/* Календари с выбором даты */}
                <InternshipSelectDateDesktop
                    selectedDates={{ startDate: null, endDate: null }}
                    onChange={(range) => {
                        console.log('Выбранные даты:', range)
                    }}
                />
            </div>
        </div>
    )
}
export default InternshipDatesDesktop
