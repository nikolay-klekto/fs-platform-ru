import React, { useState, useEffect } from 'react'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'

interface EmailInputProps {
    value: string
    onChange: (value: string) => void
    externalError?: string | null
    inputClassName?: string
    labelClassName?: string
    errorClassName?: string
    inputERRAddStyle?: string
    inputNOERRAddStyle?: string
    required?: boolean
}

const EmailInputDesktop: React.FC<EmailInputProps> = ({
    value,
    onChange,
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

        const error =
            required && !value.trim() ? 'Поле обязательно для заполнения' : validateEmailDesktop(value).textError

        setInternalError(error)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (touched) {
            const error =
                required && !newValue.trim()
                    ? 'Поле обязательно для заполнения'
                    : validateEmailDesktop(newValue).textError

            setInternalError(error)
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

// const EmailInputDesktop: React.FC<EmailInputProps> = ({
//     value,
//     onChange,
//     externalError,
//     inputClassName,
//     labelClassName,
//     errorClassName,
//     inputERRAddStyle,
//     inputNOERRAddStyle,
//     required = false,
// }) => {
//     const [internalError, setInternalError] = useState<string | null>(null)
//     const [touched, setTouched] = useState(false)

//     useEffect(() => {
//         if (externalError) {
//             setInternalError(null)
//         }
//     }, [externalError])

//     const handleBlur = () => {
//         setTouched(true)
//         if (!externalError) {
//             const error =
//                 required && !value.trim() ? 'Поле обязательно для заполнения' : validateEmailDesktop(value).textError
//             setInternalError(error)
//         }
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newValue = e.target.value
//         onChange(newValue)

//         if (touched && !externalError) {
//             const { textError } = validateEmailDesktop(newValue)
//             setInternalError(textError)
//         }
//     }

//     const hasError = Boolean(externalError || internalError)

//     return (
//         <div className="flex flex-col">
//             <label htmlFor="email-input" className={`${labelClassName}`}>
//                 Почта
//             </label>
//             <input
//                 id="email-input"
//                 type="email"
//                 value={value}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="Введите почту"
//                 className={`${inputClassName} ${hasError ? inputERRAddStyle : inputNOERRAddStyle}`}
//             />
//             {internalError && <p className={`${errorClassName}`}>{internalError}</p>}
//         </div>
//     )
// }

export default EmailInputDesktop
