import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
    'flex w-full rounded-md border text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-input bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                contacts_page_desktop:
                    'text-5xl bg-transparent ring-offset-transparent border-2 border-[#878797] focus:border-[3px] focus:ring-transparent',
                contacts_page_error_desktop:
                    'text-5xl bg-transparent ring-offset-transparent border-2 border-[#bc8070] focus:border-[3px] focus:ring-transparent',
            },
            size: {
                default: 'h-10 px-3 py-2',
                contacts_page_desktop: 'h-60 px-4 py-3.5',
            },
            rounded: {
                default: 'rounded-md',
                rounded_33: 'rounded-[33px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            rounded: 'default',
        },
    },
)

export interface EnhancedTextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'>,
        VariantProps<typeof textareaVariants> {
    validate?: (value: string) => { textError: string; status: boolean | null; styleError: boolean } | undefined
    error?: string
    onChange?: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    label?: string
    helperText?: string
    wrapperClassName?: string
    placeholder?: string
    name?: string
}

const EnhancedTextareaDesktop = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            validate,
            onChange,
            onFocus,
            onBlur,
            label,
            helperText,
            name,
            wrapperClassName,
            placeholder,
            ...props
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = React.useState<string>('')
        const [internalError, setInternalError] = React.useState('')
        const [styleErrorClass, setStyleErrorClass] = React.useState(false)
        const [isFocused, setIsFocused] = React.useState(false)

        function validateComponent(newValue: string) {
            if (validate) {
                const validationResult = validate(newValue)
                if (validationResult) {
                    const { textError, status, styleError } = validationResult
                    if (!status) {
                        if (textError) {
                            setInternalError(textError)
                        }
                        if (!styleError) {
                            setStyleErrorClass(true)
                        }
                    } else {
                        setStyleErrorClass(false)
                        setInternalError('')
                    }
                }
            }
        }

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = e.target.value
            setInternalValue(newValue)
            onChange?.(newValue)
        }

        const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(true)
            onFocus?.()
        }

        const handleBlur = () => {
            setIsFocused(false)
            onBlur?.()
            internalValue && validateComponent(internalValue)
        }

        return (
            <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
                {label && <label className="text-sm font-medium text-foreground">{label}</label>}
                <textarea
                    className={cn(
                        textareaVariants({ variant, size, rounded }),
                        isFocused && 'ring-2 ring-ring ring-offset-2',
                        className,
                        styleErrorClass && 'custom_error_style_input',
                    )}
                    ref={ref}
                    name={name}
                    placeholder={placeholder}
                    value={internalValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {(helperText || internalError !== '') && (
                    <span className={cn('text-xs', internalError ? 'text-destructive' : 'text-muted-foreground')}>
                        {internalError || helperText}
                    </span>
                )}
            </div>
        )
    },
)

EnhancedTextareaDesktop.displayName = 'EnhancedTextarea'

export { EnhancedTextareaDesktop, textareaVariants }
