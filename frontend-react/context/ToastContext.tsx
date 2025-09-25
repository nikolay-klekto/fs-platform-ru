'use client'

import { useState, createContext, useContext, useCallback } from 'react'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}

let count = 0
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type ToastContextValue = {
    toasts: ToasterToast[]
    toast: (toast: Omit<ToasterToast, 'id' | 'open'>) => string
    dismiss: (id: string) => void
    removeFromList: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

function useToastCore() {
    const [toasts, setToasts] = useState<ToasterToast[]>([])

    const toast = useCallback((t: Omit<ToasterToast, 'id' | 'open'>) => {
        const id = genId()
        setToasts((prev) => [{ ...t, id, open: true }, ...prev])
        return id
    }, [])

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)))
    }, [])

    const removeFromList = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return { toasts, toast, dismiss, removeFromList }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const toast = useToastCore()
    return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
    return ctx
}
