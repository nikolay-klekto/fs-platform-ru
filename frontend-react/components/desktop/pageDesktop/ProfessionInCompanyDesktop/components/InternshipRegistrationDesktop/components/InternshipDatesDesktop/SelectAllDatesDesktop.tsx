'use client'

import React from 'react'
import InternshipSelectDatesDesktop from './components/IntenrshipSelectDatesDesktop/SelectDatesDesktop'
import InternshipAddDateIntervalDesktop from './components/AddDateIntervalDesktop/AddDateIntervalDesktop'

const InternshipSelectAllDatesDesktop: React.FC = () => {
    return (
        <div className="flex flex-col pl-[200px]">
            <InternshipSelectDatesDesktop />
            <InternshipAddDateIntervalDesktop />
        </div>
    )
}

export default InternshipSelectAllDatesDesktop
