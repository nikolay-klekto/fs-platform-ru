import React, { useState } from 'react'
import { EyeOffPasswordDesktop, EyeOnPasswordDesktop, PasswordGeneratorDesktop } from '@/components/assets/icons'
import { validatePassword } from '@/components/desktop/commonDesktop/validate/validatePasswordDesktop'
import { generatePassword } from '@/components/desktop/commonDesktop/generatePassword'

interface IPasswordInput {
    value: string
    onChange: (value: string) => void
    onError: (value: string) => void
    label: string
    placeholder: string
    externalError?: string | null
    inputClassName?: string
    labelClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
    showGenerateButton?: boolean
    required?: boolean
}

const PasswordInputDesktop: React.FC<IPasswordInput> = ({
    value,
    onChange,
    onError,
    label,
    placeholder,
    externalError,
    inputClassName,
    labelClassName,
    errorClassName,
    inputERRAddStyle,
    inputNOERRAddStyle,
    showGenerateButton = false,
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)

    const handleGeneratePassword = () => {
        const newPassword = generatePassword()
        onChange(newPassword)
        setInternalError(null)
    }

    const handleBlur = () => {
        setTouched(true)
        const error = required && !value.trim() ? 'Поле обязательно для заполнения' : validatePassword(value).textError
        setInternalError(error)
        onError(error)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched) {
            const { textError } = validatePassword(newValue)
            setInternalError(textError)
            onError(textError)
        }
    }

    const hasError = Boolean(externalError || internalError)

    return (
        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor={label} className={`${labelClassName}`}>
                {label}
            </label>
            <div className="relative flex w-full">
                <input
                    id={label}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${inputClassName} ${hasError ? inputERRAddStyle : inputNOERRAddStyle}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 flex  -translate-y-1/2 items-center text-[#878797]"
                >
                    {showPassword ? <EyeOnPasswordDesktop /> : <EyeOffPasswordDesktop />}
                </button>
                {showGenerateButton && (
                    <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="absolute right-[-10%] top-1/2 flex -translate-y-1/2 items-center text-[#878797]"
                    >
                        <PasswordGeneratorDesktop />
                    </button>
                )}
            </div>
            {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
        </div>
    )
}

export default PasswordInputDesktop
