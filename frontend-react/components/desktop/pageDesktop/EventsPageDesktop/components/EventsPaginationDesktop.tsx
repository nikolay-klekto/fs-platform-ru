'use client'

import React from 'react'
import { LessIconDesktop, MoreIconDesktop } from '@/components/assets/icons'

interface IProfessionsPagination {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const EventsPaginationDesktop: React.FC<IProfessionsPagination> = ({ totalPages, currentPage, onPageChange }) => {
    const siblingsCount = 2

    const getPageNumbers = () => {
        const pages: number[] = []
        const startPage = Math.max(2, currentPage - siblingsCount)
        const endPage = Math.min(totalPages - 1, currentPage + siblingsCount)

        pages.push(1)

        if (startPage > 2) {
            pages.push(-1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        if (endPage < totalPages - 1) {
            pages.push(-1)
        }

        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="relative z-[2] mb-[88px] mt-[73px] flex items-center justify-center gap-5">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`transition-colors duration-300 ${
                    currentPage === 1 ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'
                }`}
            >
                <LessIconDesktop />
            </button>

            <div className="flex items-end justify-center gap-5">
                {pageNumbers.map((page, index) =>
                    page === -1 ? (
                        <span key={`dots-${index}`} className="text-2xl font-medium text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            className={`text-7xl font-medium ${
                                currentPage === page ? 'text-gradient_desktop_custom' : 'text-[#FFFFFFCC]'
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ),
                )}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`transition-colors duration-300 ${
                    currentPage >= totalPages ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'
                }`}
            >
                <MoreIconDesktop />
            </button>
        </div>
    )
}

export default EventsPaginationDesktop
