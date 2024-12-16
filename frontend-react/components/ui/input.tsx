import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
    'ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-input bg-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                gradient_desktop:
                    'flex border-0 text-5xl text-[#878797] caret-[#878797] outline-none placeholder:font-semibold placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                search_mobi:
                    'flex border-0 bg-transparent text-xl text-[#878797] outline-none placeholder:text-[14px] placeholder:font-medium placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                contacts_page_desktop:
                    'text-5xl bg-transparent ring-offset-transparent border-2 border-[#878797] focus:border-[3px] focus:ring-transparent',
                contacts_page_error_desktop:
                    'text-5xl bg-transparent ring-offset-transparent border-2 border-[#bc8070] focus:border-[3px] focus:ring-transparent',
                contacts_page_mobi:
                    'text-xs placeholder:font-medium bg-transparent ring-offset-transparent border-[1.18px] border-[#878797] focus:border-2 focus:ring-transparent',
                contacts_page_error_mobi:
                    'text-xs placeholder:font-medium bg-transparent ring-offset-transparent border-[1.18px] border-[#bc8070] focus:border-2 focus:ring-transparent',
            },
            size: {
                default: 'h-10 px-3 py-2',
                gradient_search_desktop: 'size-full py-[20px] pl-[20px] pr-[70px]',
                gradient_desktop: 'size-full p-[20px]',
                search_mobi: 'size-full py-[15px] pl-[10px] pr-[45px]',
                send_mobi: 'size-full px-[10px]',
                contacts_page_desktop: 'h-[53px] w-[453px] px-4 py-3.5 2xl:w-[520px]',
                contacts_page_info_desktop: 'h-[53px] w-[484px] px-4 py-3.5 3xl:w-[452px] 2xl:w-[520px]',
                contacts_page_mobi: 'h-[28.5px] max-w-[346px] px-4 py-2',
            },
            rounded: {
                default: 'rounded-md',
                full: 'rounded-full',
                rounded_50: 'rounded-[50px]',
                rounded_53: 'rounded-[53px]',
                rounded_30: 'rounded-[30px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            rounded: 'default',
        },
    },
)

export interface EnhancedInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
        VariantProps<typeof inputVariants> {
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
    labelClassName?: string
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
    (
        {
            className,
            type,
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
            labelClassName,
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

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value
            setInternalValue(newValue)
            // validateComponent(newValue)
            onChange?.(newValue)
        }

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
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
                {label && <label className={cn('text-sm font-medium text-foreground', labelClassName)}>{label}</label>}
                <input
                    type={type}
                    className={cn(
                        inputVariants({ variant, size, rounded }),
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

EnhancedInput.displayName = 'EnhancedInput'

export { EnhancedInput, inputVariants }
