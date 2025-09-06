import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CheckedBoxFormDesktop, UncheckedBoxFormDesktop } from '@/components/assets/iconsDesktop'

const inputVariants = cva(
    '',
    //input-form-mobi-custom ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
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
                    'border-2 border-[#878797] bg-transparent focus:!bg-transparent text-5xl ring-offset-transparent placeholder:text-[19px] placeholder:text-[#353652] placeholder:font-medium focus:border-[#FFFFFF]',
                contacts_page_error_desktop:
                    'border-2 border-[#bc8070] bg-[#1F2040] text-5xl ring-offset-transparent placeholder:font-medium placeholder:text-[#353652] focus:bg-transparent',
                contacts_page_mobi:
                    'focus:border-1.1 border-[1.18px] border-[#878797] bg-transparent ring-offset-transparent placeholder:font-medium focus:border-[1.18px] focus:border-white focus:bg-[#1f203f] focus:ring-transparent ',
                contacts_page_error_mobi:
                    'focus:border-1.1 border-[1.18px] border-[#bc8070] bg-[#1f203f] ring-offset-transparent placeholder:font-medium focus:border-white focus:ring-transparent',
                events_date_desktop: 'h-[22px] border-none bg-transparent placeholder-gray-500 outline-none',
                common_input_desktop:
                    'text18px_desktop placeholder:text18px_desktop border-2 border-[#878797] bg-[#101030] font-medium text-white outline-none placeholder:font-medium placeholder:text-[#353652] focus:border-[#878797] focus:bg-[#1f203f] focus:outline-none',
                common_input_mobi:
                    'text14px_mobi placeholder:text14px_mobi border-2 border-[#878797] bg-[#101030] text-white transition duration-300 placeholder:font-medium placeholder:text-[#353652] placeholder:transition-colors focus:border-[#878797] focus:outline-none',
            },
            size: {
                default: 'h-10 px-3 py-2',
                gradient_search_desktop: 'size-full py-[20px] pl-[20px] pr-[70px]',
                gradient_desktop: 'size-full p-[20px]',
                search_mobi: 'size-full py-[16px] pl-[10px] pr-[20px]',
                search_companies_mobi: 'size-full py-[15px]  pl-[20px]',
                send_mobi: 'size-full px-[10px]',
                contacts_page_desktop: 'h-[53px] w-full px-4 mt-0',
                contacts_page_info_desktop: '3xl:w-[452px] h-[53px] w-[484px] px-4 py-3.5 2xl:w-[520px]',
                contacts_page_mobi: 'h-[29.5px] md:h-[40px]',
                common_input_desktop: 'mt-1 h-[50px] px-4 py-2',
                common_input_mobi: 'h-11 px-4 py-2',
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
    onSubmit?: () => void
    label?: string
    helperText?: string
    helperTextClassName?: string
    wrapperClassName?: string
    labelClassName?: string
    placeholder?: string
    name?: string
    checkboxIconSize?: string
    checked?: boolean
    hasError?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, IEnhancedInput>(
    (
        {
            className,
            type,
            variant,
            size,
            rounded,
            onChange,
            onFocus,
            onBlur,
            label,
            name,
            wrapperClassName,
            labelClassName,
            placeholder,
            checked,
            checkboxIconSize,
            hasError,
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
        const [isFocused, setIsFocused] = React.useState(false)
        const isCheckbox = type === 'checkbox'

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
                            'text15px_desktop font-medium',
                            labelClassName,
                            isCheckbox &&
                                cn('flex items-center gap-4', internalValue ? 'text-white' : 'text-[#878797]'),
                        )}
                    >
                        {isCheckbox && (
                            <button
                                type="button"
                                className={cn(
                                    'cursor-pointer flex items-center justify-center rounded transition-all',
                                    className,
                                    hasError,
                                )}
                                onClick={handleCheckboxToggle}
                            >
                                {internalValue ? (
                                    <CheckedBoxFormDesktop className={checkboxIconSize} />
                                ) : (
                                    <UncheckedBoxFormDesktop
                                        className={checkboxIconSize}
                                        style={{ color: hasError ? '#BC8070' : '#878797' }}
                                    />
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
                            isFocused && 'focus:bg-[#1f203f] focus:outline-none',
                            className,
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
            </div>
        )
    },
)

EnhancedInput.displayName = 'EnhancedInput'

export { EnhancedInput, inputVariants }
