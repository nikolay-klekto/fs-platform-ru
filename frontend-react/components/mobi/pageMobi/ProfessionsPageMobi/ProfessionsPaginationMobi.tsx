'use client'

import React from 'react'
import { LessIcon, MoreIcon } from '@/components/assets/icons'

interface ProfessionsPaginationMobiProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const ProfessionsPaginationMobi: React.FC<ProfessionsPaginationMobiProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    return (
        <div className="mb-[88px] mt-[73px] flex items-center justify-center gap-5">
            <LessIcon className="text-[#FFFFFFCC]" />

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                return (
                    <button
                        key={pageNumber}
                        className={`text-7xl font-medium ${
                            currentPage === pageNumber ? 'text-gradient_mobi_custom' : 'text-[#FFFFFFCC]'
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            })}
            <MoreIcon className="text-[#FFFFFFCC]" />
        </div>
    )
}

export default ProfessionsPaginationMobi
