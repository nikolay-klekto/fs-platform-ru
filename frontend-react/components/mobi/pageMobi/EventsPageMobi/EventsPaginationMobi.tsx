'use client'

import React from 'react'
import { LessIcon, MoreIcon } from '@/components/assets/icons'

interface ProfessionsPaginationMobiProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const EventsPaginationMobi: React.FC<ProfessionsPaginationMobiProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="relative z-[2] mb-[88px] mt-[73px] flex items-center justify-center gap-5">
            <LessIcon />
            <div className="flex items-end justify-center gap-5">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    return (
                        <button
                            key={pageNumber}
                            className={`text-7xl font-medium text-[FFFFCC] ${
                                currentPage === pageNumber
                                    ? 'text-gradient_desktop_custom top border-b-2 border-indigo-500 text-[32px]'
                                    : ''
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <MoreIcon />
        </div>
    )
}

export default EventsPaginationMobi
