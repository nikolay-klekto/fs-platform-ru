import { useRef } from 'react'

export function useBackdropClose(onClose: () => void) {
    const modalRef = useRef<HTMLDivElement>(null)

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            onClose()
        }
    }

    return { modalRef, handleBackdropClick, handleBackdropKeyDown }
}
