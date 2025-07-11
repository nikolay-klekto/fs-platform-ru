import React, { useState } from 'react'
import { EyeOffPasswordMobi, EyeOnPasswordMobi, PasswordGeneratorMobi } from '@/components/assets/iconsMobi'
import { validatePasswordMobi } from '@/components/mobi/commonMobi/validate/validatePasswordMobi'
import { generatePassword } from '@/components/mobi/commonMobi/generatePasswordMobi'

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

const PasswordInputMobi: React.FC<IPasswordInput> = ({
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
            <div className="mb-[8px]">
                <label htmlFor={label} className={`${labelClassName}`}>
                    {label}
                </label>
            </div>
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
                    className="sm_l:w-[16px] sm_s:w-[16px] absolute right-4  top-1/2 flex -translate-y-1/2 items-center text-[#878797] sm:w-[16px]"
                >
                    {showPassword ? <EyeOnPasswordMobi /> : <EyeOffPasswordMobi />}
                </button>
                {showGenerateButton && (
                    <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="sm_l:w-[16px] sm_s:w-[16px] absolute right-4 top-[-55%] flex items-center text-[#878797] sm:w-[16px]"
                    >
                        <PasswordGeneratorMobi />
                    </button>
                )}
            </div>
            {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
        </div>
    )
}

export default PasswordInputMobi
