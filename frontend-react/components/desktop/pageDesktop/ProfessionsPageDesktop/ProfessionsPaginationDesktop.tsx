'use client'

import React, { useState } from 'react'
import { LessIcon, MoreIcon } from '@/components/assets/icons'

interface ProfessionsPaginationDesktopProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const ProfessionsPaginationDesktop: React.FC<ProfessionsPaginationDesktopProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const [visibleStart, setVisibleStart] = useState(1)
    const visibleEnd = visibleStart + 2

    const handleLessClick = () => {
        if (visibleStart > 1) {
            setVisibleStart(visibleStart - 1)
            onPageChange(visibleStart - 1)
        }
    }
    const handleMoreClick = () => {
        if (visibleEnd < totalPages) {
            setVisibleStart(visibleStart + 1)
            onPageChange(visibleStart + 1)
        }
    }

    return (
        <div className="relative z-[2] mb-[88px] mt-[73px] flex items-center justify-center gap-5">
            <LessIcon
                className={visibleStart === 1 ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'}
                onClick={visibleStart > 1 ? handleLessClick : undefined}
            />

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                return (
                    <button
                        key={pageNumber}
                        className={`text-7xl font-medium ${
                            currentPage === pageNumber ? 'text-gradient_desktop_custom' : 'text-[#FFFFFFCC]'
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            })}
            <MoreIcon
                className={
                    visibleEnd >= totalPages ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'
                }
                onClick={visibleEnd < totalPages ? handleMoreClick : undefined}
            />
        </div>
    )
}

export default ProfessionsPaginationDesktop
