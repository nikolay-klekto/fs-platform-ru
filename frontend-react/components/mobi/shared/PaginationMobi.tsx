'use client'
import { usePagination } from '@/hooks/usePagination'
import { LessIconMobi, MoreIconMobi } from '@/components/assets/iconsMobi'

interface IPaginationMobiProps {
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

const PaginationMobi: React.FC<IPaginationMobiProps> = ({
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
        <div className="mx-auto mb-[30px] mt-[25px] flex w-[150px] items-center justify-between">
            <LessIconMobi
                width={'10'}
                height={'19'}
                className={lessDisabled ? 'pointer-events-none opacity-50' : ''}
                onClick={
                    lessDisabled
                        ? undefined
                        : () => {
                              onPageChange(currentPage - 1)
                              scrollToTop()
                          }
                }
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
                                scrollToTop()
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
                className={moreDisabled ? 'pointer-events-none opacity-50' : ''}
                onClick={
                    moreDisabled
                        ? undefined
                        : () => {
                              onPageChange(currentPage + 1)
                              scrollToTop()
                          }
                }
            />
        </div>
    )
}

export default PaginationMobi
