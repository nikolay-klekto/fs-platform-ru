import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CheckedBoxFormDesktop, UncheckedBoxFormDesktop } from '@/components/assets/iconsDesktop'

const inputVariants = cva(
    'ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'border-input bg-background',
                // focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2
                gradient_desktop:
                    'flex border-0 text-5xl text-[#878797] caret-[#878797] outline-none placeholder:font-semibold placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                search_mobi:
                    'flex border-0 bg-transparent text-xl text-[#878797] outline-none placeholder:text-[14px] placeholder:font-medium placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                contacts_page_desktop:
                    'border-2 border-[#878797] bg-transparent text-5xl ring-offset-transparent placeholder:font-medium focus:border-[3px] focus:ring-transparent',
                contacts_page_error_desktop:
                    'border-2 border-[#bc8070] bg-transparent text-5xl ring-offset-transparent placeholder:font-medium focus:border-[3px] focus:ring-transparent',
                contacts_page_mobi:
                    'border-[1.18px] border-[#878797] bg-transparent text-xl ring-offset-transparent placeholder:text-xs placeholder:font-medium focus:border-2 focus:ring-transparent md:placeholder:text-base',
                contacts_page_error_mobi:
                    'border-[1.18px] border-[#bc8070] bg-transparent text-xl ring-offset-transparent placeholder:text-xs placeholder:font-medium focus:border-2 focus:ring-transparent md:placeholder:text-base',
                events_date_desktop: 'h-[22px] border-none bg-transparent placeholder-gray-500 outline-none',
            },
            size: {
                default: 'h-10 px-3 py-2',
                gradient_search_desktop: 'size-full py-[20px] pl-[20px] pr-[70px]',
                gradient_desktop: 'size-full p-[20px]',
                search_mobi: 'size-full py-[16px] pl-[10px] pr-[20px]',
                search_companies_mobi: 'size-full py-[15px]  pl-[20px]',
                send_mobi: 'size-full px-[10px]',
                contacts_page_desktop: 'h-[53px] w-[453px] px-4 py-3.5 2xl:w-[520px]',
                contacts_page_info_desktop: '3xl:w-[452px] h-[53px] w-[484px] px-4 py-3.5 2xl:w-[520px]',
                contacts_page_mobi: 'h-[28.5px] max-w-[346px] px-4 py-2 md:h-[32px]',
            },
            rounded: {
                default: 'rounded-md',
                full: 'rounded-full',
                rounded_50: 'rounded-[50px]',
                rounded_53: 'rounded-[53px]',
                rounded_30: 'rounded-[30px]',
                rounded_20: 'rounded-[20px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            rounded: 'default',
        },
    },
)

export interface IEnhancedInput
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
        VariantProps<typeof inputVariants> {
    validate?: (value: string) => { textError: string; status: boolean | null; styleError: boolean } | undefined
    error?: string
    onChange?: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    label?: string
    helperText?: string
    helperTextClassName?: string
    wrapperClassName?: string
    labelClassName?: string
    placeholder?: string
    name?: string
    checkboxIconSize?: string
    checked?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, IEnhancedInput>(
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
            helperTextClassName,
            name,
            wrapperClassName,
            labelClassName,
            placeholder,
            checked,
            checkboxIconSize,
            ...props
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = React.useState(() => {
            if (typeof checked === 'boolean') {
                return false
            }
            return ''
        })
        const [internalError, setInternalError] = React.useState<string>('')
        const [styleErrorClass, setStyleErrorClass] = React.useState(false)
        const [isFocused, setIsFocused] = React.useState(false)
        const isCheckbox = type === 'checkbox'
        function validateComponent(newValue: string | boolean) {
            if (validate) {
                const validationResult = validate(newValue.toString())
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
            const newValue = isCheckbox ? e.target.checked : e.target.value
            setInternalValue(newValue.toString())
            onChange?.(newValue.toString())
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

        const handleCheckboxToggle = () => {
            const newValue = !internalValue
            setInternalValue(newValue)
            onChange?.(newValue.toString())
        }

        return (
            <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
                {label && (
                    <label
                        htmlFor={name}
                        className={cn(
                            'text15px_desktop font-medium text-[#878797]',
                            labelClassName,
                            isCheckbox && 'flex items-center gap-4',
                        )}
                    >
                        {isCheckbox && (
                            <button
                                type="button"
                                className={cn(
                                    'cursor-pointer flex items-center justify-center rounded transition-all',
                                    className,
                                )}
                                onClick={handleCheckboxToggle}
                            >
                                {internalValue ? (
                                    <CheckedBoxFormDesktop className={checkboxIconSize} />
                                ) : (
                                    <UncheckedBoxFormDesktop className={checkboxIconSize} />
                                )}
                            </button>
                        )}
                        {label}
                    </label>
                )}
                {!isCheckbox && (
                    <input
                        id={name}
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
                        value={internalValue.toString()}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />
                )}
                {(helperText || internalError !== '') && (
                    <p className={cn(helperTextClassName, internalError ? 'text-[#BC8070] ' : 'text-muted-foreground')}>
                        {internalError || helperText}
                    </p>
                )}
            </div>
        )
    },
)

EnhancedInput.displayName = 'EnhancedInput'

export { EnhancedInput, inputVariants }
