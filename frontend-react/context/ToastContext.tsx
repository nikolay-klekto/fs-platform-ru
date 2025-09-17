'use client'

import { useState, createContext, useContext, useCallback } from 'react'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 4000

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
    dismiss: (id?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

function useToastCore() {
    const [toasts, setToasts] = useState<ToasterToast[]>([])

    const toast = (toast: Omit<ToasterToast, 'id' | 'open'>) => {
        const id = genId()
        const newToast: ToasterToast = { ...toast, id, open: true }

        setToasts((prev) => [newToast, ...prev].slice(0, TOAST_LIMIT))

        setTimeout(() => {
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)))
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, TOAST_REMOVE_DELAY)
        }, TOAST_REMOVE_DELAY)

        return id
    }

    const dismiss = useCallback((id?: string) => {
        setToasts((prev) =>
            id ? prev.map((t) => (t.id === id ? { ...t, open: false } : t)) : prev.map((t) => ({ ...t, open: false })),
        )
        setTimeout(() => {
            setToasts((prev) => (id ? prev.filter((t) => t.id !== id) : []))
        }, TOAST_REMOVE_DELAY)
    }, [])

    return { toasts, toast, dismiss }
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
