'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const RadixToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            'fixed right-0 z-[100] flex w-auto',
            'top-[180px]',
            'max-h-[calc(100vh-150px-20px)]',
            'md:top-[90px]',
            'sm_xl:top-[90px]',
            'sm_l:top-[80px]',
            'sm_s:top-[80px]',
            'sm:top-[70px]',
            className,
        )}
        {...props}
    />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=e7d]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full group pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
    {
        variants: {
            variant: {
                default:
                    'break-words bg-[#1C1B55] sm:px-5 sm:py-2 sm_s:px-5 sm_s:py-2 sm_l:px-5 sm_l:py-2 sm_xl:px-5 sm_xl:py-2 md:py-2 text-justify text-white md:px-7 p-6',
                destructive: 'destructive border-destructive bg-destructive text-destructive-foreground group',
            },
            size: {
                default: `
                    sm:max-w-[250px]
                    sm_s:max-w-[280px] 
                    sm_l:max-w-[313px] 
                    sm_xl:max-w-[313px] 
                    md:max-w-[clamp(390px,70vw,430px)] 
                    2xl:w-[650px] 
                    3xl:w-[800px] 
                    w-[900px] 
              `,
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Action>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            'flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
            className,
        )}
        {...props}
    />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Title>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Description>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn(
            'text-10xl opacity-90',
            '3xl:text-9xl',
            '2xl:text-6xl',
            'md:text-[clamp(16px,3vw,18px)]',
            'sm:text-xl',
            'sm_xl:text-xl',
            'sm_l:text-xl',
            'sm_s:text-base',
            'sm:text-base',
            className,
        )}
        {...props}
    />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
    type ToastProps,
    type ToastActionElement,
    RadixToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
}
