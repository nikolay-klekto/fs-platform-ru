'use client'

import React, { useState, useEffect, useRef } from 'react'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'

interface IPhoneInputMobi {
    value: string
    onChange: (value: string) => void
    onError: (value: string) => void
    onBlur?: (value: string) => void
    validationStatus?: boolean
    className?: string
    wrapperClassName?: string
    showInternalError?: boolean
    required?: boolean
    labelClassName?: string
    placeholder?: string
}

const PHONE_MASK = '+375 (__) ___-__-__'

const digitPositions: number[] = []
for (let i = 0; i < PHONE_MASK.length; i++) {
    if (PHONE_MASK[i] === '_') {
        digitPositions.push(i)
    }
}

const PhoneInputMobi: React.FC<IPhoneInputMobi> = ({
    value,
    onChange,
    onError,
    className,
    wrapperClassName,
    labelClassName,
    placeholder,
    required = false,
}) => {
    const [inputValue, setInputValue] = useState<string>(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const [internalError, setInternalError] = useState<string | null>(null)

    const setCaretToPosition = (pos: number) => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(pos, pos)
            inputRef.current.focus()
        }
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let newValue = inputValue || PHONE_MASK

        if (e.key === 'Backspace') {
            e.preventDefault()
            const pos = inputRef.current?.selectionStart
            if (pos === undefined || pos === null || pos === 0) return
            for (let i = pos - 1; i >= 0; i--) {
                if (digitPositions.includes(i)) {
                    if (newValue[i] !== '_') {
                        newValue = newValue.substring(0, i) + '_' + newValue.substring(i + 1)
                        setInputValue(newValue)
                        onChange(newValue)
                        setTimeout(() => setCaretToPosition(i), 0)
                        break
                    }
                }
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab') {
            return
        } else if (e.key >= '0' && e.key <= '9') {
            e.preventDefault()
            const pos = inputRef.current?.selectionStart
            if (pos === undefined || pos === null) return
            const nextPos = digitPositions.find((p) => p >= pos)
            if (nextPos === undefined) return
            newValue = newValue.substring(0, nextPos) + e.key + newValue.substring(nextPos + 1)
            setInputValue(newValue)
            onChange(newValue)
            const following = digitPositions.find((p) => p > nextPos)
            const caretPos = following !== undefined ? following : nextPos + 1
            setTimeout(() => setCaretToPosition(caretPos), 0)
        } else {
            e.preventDefault()
        }
        validateValue(newValue)
    }

    const validateValue = (value: string) => {
        const error =
            required && (value === PHONE_MASK || !value)
                ? 'Поле обязательно для заполнения'
                : validatePhoneMobi(value).textError
        setInternalError(error)
        onError(error)
        onChange(value)
    }

    const handleBlur = () => {
        validateValue(inputValue)
    }

    const handleFocus = () => {
        if (inputValue === PHONE_MASK) {
            setCaretToPosition(digitPositions[0])
        } else {
            const rawDigits = inputValue.replace(/\D/g, '')
            const pos = Math.min(digitPositions.length, rawDigits.length)
            setCaretToPosition(digitPositions[pos - 1] || digitPositions[0])
        }
    }

    const handleClick = () => {
        if (inputValue === PHONE_MASK) {
            setCaretToPosition(digitPositions[0])
        }
    }

    return (
        <div className={`flex w-full flex-col gap-1.5 ${wrapperClassName}`}>
            <label htmlFor="phone" className={`mb-1 text-2xl font-medium text-white  ${labelClassName}`}>
                Номер телефона
            </label>
            <input
                ref={inputRef}
                id="phone"
                type="tel"
                name="phone"
                value={inputValue}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onChange={() => {}}
                onClick={handleClick}
                onBlur={handleBlur}
                placeholder={PHONE_MASK || placeholder}
                className={`input-form-mobi-custom w-full border-2 font-medium placeholder:text-[#353652] focus:border-2 ${internalError ? 'border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797] focus:border-[#878797]'} ${className}`}
            />
        </div>
    )
}

export default PhoneInputMobi
