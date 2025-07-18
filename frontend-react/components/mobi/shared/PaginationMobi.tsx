'use client'
import { usePagination } from '@/hooks/usePagination'
import { LessIconMobi, MoreIconMobi } from '@/components/assets/iconsMobi'

interface PaginationMobiProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    visibleCount?: number
}

const PaginationMobi: React.FC<PaginationMobiProps> = ({ totalPages, currentPage, onPageChange, visibleCount = 3 }) => {
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
                              window.scrollTo({ top: 0, behavior: 'smooth' })
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
                className={moreDisabled ? 'pointer-events-none opacity-50' : ''}
                onClick={
                    moreDisabled
                        ? undefined
                        : () => {
                              onPageChange(currentPage + 1)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                          }
                }
            />
        </div>
    )
}

export default PaginationMobi
