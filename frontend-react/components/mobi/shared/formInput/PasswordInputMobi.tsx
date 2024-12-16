import React, { useState, useEffect } from 'react'
import { EyeOffPasswordDesktop, EyeOnPasswordDesktop, PasswordGeneratorDesktop } from '@/components/assets/icons'
import { validatePasswordMobi } from '@/components/mobi/commonMobi/validate/validatePasswordMobi'
import { generatePassword } from '@/components/mobi/commonMobi/generatePasswordMobi'

interface PasswordInputProps {
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

const PasswordInputMobi: React.FC<PasswordInputProps> = ({
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
        const error =
            required && !value.trim() ? 'Поле обязательно для заполнения' : validatePasswordMobi(value).textError
        setInternalError(error)
        onError(error)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched) {
            const { textError } = validatePasswordMobi(newValue)
            setInternalError(textError)
            onError(textError)
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
                    className={`w-full ${inputClassName} ${hasError ? inputERRAddStyle : inputNOERRAddStyle}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 transform -translate-y-1/2  right-4 flex items-center text-[#878797] sm_l:w-[16px] sm_s:w-[16px] sm:w-[16px]"
                >
                    {showPassword ? <EyeOnPasswordDesktop /> : <EyeOffPasswordDesktop />}
                </button>
                {showGenerateButton && (
                    <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="absolute top-[-55%] right-4 flex items-center text-[#878797] sm_l:w-[16px] sm_s:w-[16px] sm:w-[16px]"
                    >
                        <PasswordGeneratorDesktop />
                    </button>
                )}
            </div>
            {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
        </div>
    )
}

export default PasswordInputMobi
