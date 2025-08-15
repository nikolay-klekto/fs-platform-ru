import { useMemo } from 'react'

interface IUsePaginationProps {
    totalPages: number
    currentPage: number
    visibleCount: number
}

export function usePagination({ totalPages, currentPage, visibleCount }: IUsePaginationProps) {
    return useMemo(() => {
        let visibleStart = currentPage - Math.floor(visibleCount / 2)
        if (visibleStart < 1) visibleStart = 1
        if (visibleStart > totalPages - visibleCount + 1) {
            visibleStart = Math.max(1, totalPages - visibleCount + 1)
        }
        const visibleEnd = Math.min(visibleStart + visibleCount - 1, totalPages)
        const arrowsDisabled = totalPages <= visibleCount

        const lessDisabled = arrowsDisabled || currentPage === 1
        const moreDisabled = arrowsDisabled || currentPage === totalPages

        return {
            visibleStart,
            visibleEnd,
            lessDisabled,
            moreDisabled,
        }
    }, [totalPages, currentPage, visibleCount])
}
