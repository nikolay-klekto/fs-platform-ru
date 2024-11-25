'use client'

import React from 'react'

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
    return (
        <div className="flex items-center justify-center space-x-4 mt-8">
            <button
                className={`text-xl ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300'}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                return (
                    <button
                        key={pageNumber}
                        className={`text-xl ${
                            currentPage === pageNumber ? 'text-purple-500 font-bold' : 'text-gray-300'
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            <button
                className={`text-xl ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300'}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    )
}

export default ProfessionsPaginationDesktop
