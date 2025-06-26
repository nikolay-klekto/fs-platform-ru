'use client'

import { LessIconMobi, MoreIconMobi } from '@/components/assets/iconsMobi'

interface IEventsPagination {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const VISIBLE_PAGES = 3

const ProfessionsPaginationMobi: React.FC<IEventsPagination> = ({ totalPages, currentPage, onPageChange }) => {
    let visibleStart = currentPage - Math.floor(VISIBLE_PAGES / 2)
    if (visibleStart < 1) visibleStart = 1
    if (visibleStart > totalPages - VISIBLE_PAGES + 1) {
        visibleStart = Math.max(1, totalPages - VISIBLE_PAGES + 1)
    }
    const visibleEnd = Math.min(visibleStart + VISIBLE_PAGES - 1, totalPages)

    const arrowsDisabled = totalPages <= VISIBLE_PAGES

    const lessDisabled = arrowsDisabled || currentPage === 1
    const moreDisabled = arrowsDisabled || currentPage === totalPages

    const handleLessClick = () => {
        if (!lessDisabled) {
            onPageChange(currentPage - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleMoreClick = () => {
        if (!moreDisabled) {
            onPageChange(currentPage + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <div className="mx-auto mb-[30px] mt-[25px] flex w-[150px] items-center justify-between">
            <LessIconMobi
                width={'10'}
                height={'19'}
                // className={currentPage === 1 ? 'pointer-events-none text-[#878797] opacity-50' : ''}
                // onClick={currentPage > 1 ? handleLessClick : undefined}
                className={lessDisabled ? 'pointer-events-none opacity-50' : ''}
                onClick={lessDisabled ? undefined : handleLessClick}
            />
            {[...Array(visibleEnd - visibleStart + 1)].map((_, idx) => {
                const pageNumber = visibleStart + idx
                return (
                    <button
                        key={pageNumber}
                        className={`text-5xl font-medium ${
                            currentPage === pageNumber ? 'text-gradient_mobi_custom' : 'text-[#FFFFFFCC]'
                        }`}
                        onClick={() => {
                            if (pageNumber !== currentPage) {
                                onPageChange(pageNumber)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                        }}
                    >
                        {pageNumber}
                    </button>
                )
            })}
            <MoreIconMobi
                width={'10'}
                height={'19'}
                // className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                // onClick={currentPage < totalPages ? handleMoreClick : undefined}
                className={moreDisabled ? 'pointer-events-none opacity-50' : ''}
                onClick={moreDisabled ? undefined : handleMoreClick}
            />
        </div>
    )
}

export default ProfessionsPaginationMobi
