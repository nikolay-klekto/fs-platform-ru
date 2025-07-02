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
                contacts_page:
                    'border-2 border-[#878797] bg-transparent text-5xl ring-offset-transparent focus:border-[3px] focus:ring-transparent',
                contacts_page_error_mobi:
                    'border-[1.18px] border-[#bc8070] bg-[#1f203f] ring-offset-transparent placeholder:font-medium focus:border-1.1 focus:border-white focus:ring-transparent md:text-xl md:placeholder:text-xs',
                contacts_page_mobi:
                    'border-[1.18px] border-[#878797] bg-transparent ring-offset-transparent placeholder:font-medium focus:border-2 focus:ring-transparent md:text-xl md:placeholder:text-xs',
            },
            size: {
                default: 'h-10 px-3 py-2',
                contacts_page_mobi: 'h-[82px] px-4 py-2 md:h-[86px]',
            },
            rounded: {
                default: 'rounded-md',
                rounded_11: 'rounded-[11px]',
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

const EnhancedTextareaMobi = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
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
            name,
            wrapperClassName,
            placeholder,
            ...props
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = React.useState<string>('')
        const [styleErrorClass, setStyleErrorClass] = React.useState(false)
        const [isFocused, setIsFocused] = React.useState(false)

        function validateComponent(newValue: string) {
            if (validate) {
                const validationResult = validate(newValue)
                if (validationResult) {
                    const { status, styleError } = validationResult
                    if (!status) {
                        if (!styleError) {
                            setStyleErrorClass(true)
                        }
                    } else {
                        setStyleErrorClass(false)
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
            </div>
        )
    },
)

EnhancedTextareaMobi.displayName = 'EnhancedTextarea'

export { EnhancedTextareaMobi, textareaVariants }
