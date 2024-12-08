import React, { useState, useEffect } from 'react'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'

interface EmailInputProps {
    value: string
    onChange: (value: string) => void
    onError: (error: string | null) => void
    externalError?: string | null
    inputClassName?: string
    labelClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
}

const EmailInputDesktop: React.FC<EmailInputProps> = ({
    value,
    onChange,
    onError,
    externalError,
    inputClassName,
    labelClassName,
    errorClassName,
    inputERRAddStyle,
    inputNOERRAddStyle,
}) => {
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)

    useEffect(() => {
        if (externalError) {
            setInternalError(null)
        }
    }, [externalError])

    const handleBlur = () => {
        setTouched(true)
        if (!externalError) {
            const { textError } = validateEmailDesktop(value)
            setInternalError(textError)
            onError(textError)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched && !externalError) {
            const { textError } = validateEmailDesktop(newValue)
            setInternalError(textError)
            onError(textError)
        }
    }

    const hasError = Boolean(externalError || internalError)

    return (
        <div className="flex flex-col">
            <label htmlFor="email-input" className={`${labelClassName}`}>
                Почта
            </label>
            <input
                id="email-input"
                type="email"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите почту"
                className={`${inputClassName} ${hasError ? inputERRAddStyle : inputNOERRAddStyle}`}
            />
            {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
        </div>
    )
}

export default EmailInputDesktop
