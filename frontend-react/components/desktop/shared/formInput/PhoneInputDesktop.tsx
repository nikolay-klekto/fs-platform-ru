import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    onError: (value: string) => void
    externalError?: string | null
    labelClassName?: string
    inputClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
    required?: boolean
}

const PhoneInputDesktop: React.FC<PhoneInputProps> = ({
    value,
    onChange,
    onError,
    externalError,
    labelClassName,
    inputClassName,
    errorClassName,
    inputERRAddStyle,
    inputNOERRAddStyle,
    required = false,
}) => {
    const [mask, setMask] = useState<string>('+9')
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const cleanedValue = inputValue.replace(/\D/g, '')

        if (cleanedValue.startsWith('3')) {
            setMask('+375 (99) 999-99-99')
        } else if (cleanedValue.startsWith('7')) {
            setMask('+7 (999) 999-99-99')
        } else {
            setMask('+9')
        }

        onChange(inputValue)

        if (touched) {
            const error =
                required && !cleanedValue.trim()
                    ? 'Поле обязательно для заполнения'
                    : validatePhoneDesktop(cleanedValue).textError
            setInternalError(error)
            onError(error)
        }
    }

    const handleBlur = () => {
        setTouched(true)

        const error =
            required && !value.trim()
                ? 'Поле обязательно для заполнения'
                : validatePhoneDesktop(value.replace(/\D/g, '')).textError

        setInternalError(error)
        onError(error)

        if (!value) {
            setMask('+9')
        }
    }

    const hasError = Boolean(externalError || internalError)

    return (
        <div className="flex flex-col">
            <label htmlFor="phone" className={labelClassName}>
                Номер телефона
            </label>
            <InputMask
                mask={mask}
                value={value}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                className={`${inputClassName} ${hasError ? inputERRAddStyle : inputNOERRAddStyle}`}
                placeholder={'+375 (__) ___-__-__'}
            />
            {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
        </div>
    )
}

export default PhoneInputDesktop
