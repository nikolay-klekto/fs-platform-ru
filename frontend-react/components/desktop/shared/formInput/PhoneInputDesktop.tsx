import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    onError: (error: string | null) => void
    externalError?: string | null
    labelClassName?: string
    inputClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
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
        }

        onChange(inputValue)

        if (touched && !externalError) {
            const { textError } = validatePhoneDesktop(cleanedValue)
            setInternalError(textError)
            onError(textError)
        }
    }

    const handleBlur = () => {
        setTouched(true)

        if (!externalError) {
            const { textError } = validatePhoneDesktop(value.replace(/\D/g, ''))
            setInternalError(textError)
            onError(textError)
        }

        if (!value) {
            setMask('+9')
        }
    }

    useEffect(() => {
        if (externalError) {
            setInternalError(null)
        }
    }, [externalError])

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
