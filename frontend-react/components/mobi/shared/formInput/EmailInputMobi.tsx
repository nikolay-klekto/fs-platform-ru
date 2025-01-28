import React, { useState } from 'react'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'

interface EmailInputProps {
    value: string
    onChange: (value: string) => void
    onError: (value: string) => void
    externalError?: string | null
    inputClassName?: string
    labelClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
    required?: boolean
}

const EmailInputMobi: React.FC<EmailInputProps> = ({
    value,
    onChange,
    onError,
    externalError,
    inputClassName,
    labelClassName,
    errorClassName,
    inputERRAddStyle,
    inputNOERRAddStyle,
    required = false,
}) => {
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)

    const handleBlur = () => {
        setTouched(true)

        const error = required && !value.trim() ? 'Поле обязательно для заполнения' : validateEmailMobi(value).textError

        setInternalError(error)
        onError(error)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched) {
            const error =
                required && !newValue.trim() ? 'Поле обязательно для заполнения' : validateEmailMobi(newValue).textError

            setInternalError(error)
            onError(error)
        }
    }

    const hasError = Boolean(internalError || externalError)

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

export default EmailInputMobi
