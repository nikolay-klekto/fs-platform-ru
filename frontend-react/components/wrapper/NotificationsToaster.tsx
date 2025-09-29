'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import { Toast, ToastDescription, RadixToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'

const EXIT_ANIMATION_MS = 200

export function NotificationsToaster() {
    const { toasts, dismiss, removeFromList } = useToast()
    const pathname = usePathname()

    const toastClose = (id: string) => {
        dismiss(id)
        setTimeout(() => removeFromList(id), EXIT_ANIMATION_MS)
    }

    useEffect(() => {
        if (!toasts.length) return
        const removeIds = toasts.map((t) => t.id)
        removeIds.forEach((id) => toastClose(id))
    }, [pathname])

    return (
        <RadixToastProvider>
            {toasts.map(({ id, title, description, action, open, duration, ...props }) => (
                <Toast
                    key={id}
                    open={open}
                    duration={duration ?? 4000}
                    onOpenChange={(open) => !open && toastClose(id)}
                    {...props}
                >
                    <div className="grid gap-1">
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                    </div>
                    {action}
                </Toast>
            ))}
            <ToastViewport />
        </RadixToastProvider>
    )
}
