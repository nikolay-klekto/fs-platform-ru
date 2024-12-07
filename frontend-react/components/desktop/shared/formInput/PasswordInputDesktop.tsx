import React, { useState, useEffect } from 'react'
import { EyeOffPasswordDesktop, EyeOnPasswordDesktop, PasswordGeneratorDesktop } from '@/components/assets/icons'
import { validatePassword } from '@/components/desktop/commonDesktop/validate/validatePasswordDesktop'
import { generatePassword } from '@/components/desktop/commonDesktop/generatePassword'

interface PasswordInputProps {
    value: string
    onChange: (value: string) => void
    label: string
    placeholder: string
    externalError?: string | null
    inputClassName?: string
    labelClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
    showGenerateButton?: boolean
}

const PasswordInputDesktop: React.FC<PasswordInputProps> = ({
    value,
    onChange,
    label,
    placeholder,
    externalError,
    inputClassName,
    labelClassName,
    errorClassName,
    inputERRAddStyle,
    inputNOERRAddStyle,
    showGenerateButton = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)

    useEffect(() => {
        if (externalError) {
            setInternalError(null)
        }
    }, [externalError])

    const handleGeneratePassword = () => {
        const newPassword = generatePassword()
        onChange(newPassword)
        setInternalError(null)
    }

    const handleBlur = () => {
        setTouched(true)
        if (!externalError) {
            const { textError } = validatePassword(value)
            setInternalError(textError)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched && !externalError) {
            const { textError } = validatePassword(newValue)
            setInternalError(textError)
        }
    }

    const hasError = Boolean(externalError || internalError)

    return (
        <div className="w-full">
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
                    className={`w-full ${inputClassName} ${hasError ? { inputERRAddStyle } : { inputNOERRAddStyle }}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 transform -translate-y-1/2  right-4 flex items-center text-[#878797]"
                >
                    {showPassword ? <EyeOnPasswordDesktop /> : <EyeOffPasswordDesktop />}
                </button>
                {showGenerateButton && (
                    <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="absolute top-1/2 transform -translate-y-1/2 right-[-10%] flex items-center text-[#878797]"
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
