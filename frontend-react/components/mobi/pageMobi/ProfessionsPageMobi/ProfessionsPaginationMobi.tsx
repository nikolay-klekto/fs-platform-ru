'use client'

import React, { useState } from 'react'
import { LessIconMobi, MoreIconMobi } from '@/components/assets/icons'

interface IProfessionsPagination {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const ProfessionsPaginationMobi: React.FC<IProfessionsPagination> = ({ totalPages, currentPage, onPageChange }) => {
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
        <div className="mx-auto mb-[30px] mt-[25px] flex w-[150px] items-center justify-between">
            <LessIconMobi
                width={'10'}
                height={'19'}
                className={visibleStart === 1 ? 'text-[#878797]' : 'text-[#FFFFFFCC]'}
                onClick={visibleStart > 1 ? handleLessClick : undefined}
            />

            {[...Array(totalPages)]
                .map((_, index) => index + 1)
                .filter((pageNumber) => pageNumber >= visibleStart && pageNumber <= visibleEnd)
                .map((pageNumber) => {
                    return (
                        <button
                            key={pageNumber}
                            className={`text-5xl font-medium ${
                                currentPage === pageNumber ? 'text-gradient_mobi_custom' : 'text-[#FFFFFFCC]'
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            <MoreIconMobi
                width={'10'}
                height={'19'}
                className={visibleEnd >= totalPages ? 'text-[#878797]' : 'text-[#FFFFFFCC]'}
                onClick={visibleEnd < totalPages ? handleMoreClick : undefined}
            />
        </div>
    )
}

export default ProfessionsPaginationMobi
