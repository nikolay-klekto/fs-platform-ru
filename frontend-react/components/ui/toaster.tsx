'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import {
    Toast,
    ToastDescription,
    ToastProvider as RadixToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
    const { toasts, dismiss } = useToast()
    const pathname = usePathname()

    useEffect(() => {
        dismiss()
    }, [pathname, dismiss])

    return (
        <RadixToastProvider>
            {toasts.map(({ id, title, description, action, ...props }) => (
                <Toast key={id} {...props}>
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
