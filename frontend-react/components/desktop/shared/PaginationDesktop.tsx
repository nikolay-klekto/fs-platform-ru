'use client'

import { usePagination } from '@/hooks/usePagination'
import { LessIconDesktop, MoreIconDesktop } from '@/components/assets/iconsDesktop'

interface IPaginationDesktopProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    visibleCount?: number
}

function scrollToTop() {
    requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}

const PaginationDesktop: React.FC<IPaginationDesktopProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    visibleCount = 3,
}) => {
    const { visibleStart, visibleEnd, lessDisabled, moreDisabled } = usePagination({
        totalPages,
        currentPage,
        visibleCount,
    })

    return (
        <div className="relative z-[2] mb-[88px] mt-[73px] flex items-center justify-center gap-5">
            <button
                onClick={
                    lessDisabled
                        ? undefined
                        : () => {
                              onPageChange(currentPage - 1)
                              scrollToTop()
                          }
                }
                disabled={lessDisabled}
                className={`transition-colors duration-300 ${
                    lessDisabled ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'
                }`}
            >
                <LessIconDesktop />
            </button>

            {[...Array(visibleEnd - visibleStart + 1)].map((_, idx) => {
                const pageNumber = visibleStart + idx
                return (
                    <button
                        key={pageNumber}
                        className={`text-7xl font-medium ${
                            currentPage === pageNumber ? 'text-gradient_desktop_custom' : 'text-[#FFFFFFCC]'
                        }`}
                        onClick={() => {
                            if (pageNumber !== currentPage) {
                                onPageChange(pageNumber)
                                scrollToTop()
                            }
                        }}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            <button
                onClick={
                    moreDisabled
                        ? undefined
                        : () => {
                              onPageChange(currentPage + 1)
                              scrollToTop()
                          }
                }
                disabled={moreDisabled}
                className={`transition-colors duration-300 ${
                    moreDisabled ? 'cursor-not-allowed text-[#878797]' : 'cursor-pointer text-[#FFFFFFCC]'
                }`}
            >
                <MoreIconDesktop />
            </button>
        </div>
    )
}

export default PaginationDesktop
