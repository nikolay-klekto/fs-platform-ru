import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
    'ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-input bg-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                contacts_page_desktop:
                    'placeholder:text-[#353652] border-2 border-[#878797] bg-transparent text-5xl ring-offset-transparent placeholder:text-[19px] placeholder:font-medium focus:border-2 focus:ring-transparent focus:placeholder:text-[#FFFFFF]',
                contacts_page_error_desktop:
                    'placeholder:text-[#353652] border-2 border-[#bc8070] bg-[#1F2040] text-5xl ring-offset-transparent placeholder:text-[19px] placeholder:font-medium focus:border-2 focus:ring-transparent',
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

        const handleFocus = () => {
            setIsFocused(true)
            onFocus?.()
        }

        const handleBlur = () => {
            setIsFocused(false)
            onBlur?.()

            if (internalValue) {
                validateComponent(internalValue)
            }
        }

        return (
            <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
                {label && <label className="text-foreground text-sm font-medium">{label}</label>}
                <textarea
                    className={cn(
                        textareaVariants({ variant, size, rounded }),
                        isFocused && 'ring-2 ring-ring ring-offset-2',
                        className,
                        styleErrorClass && 'border-[#BC8070]',
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
