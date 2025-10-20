'use client'

import React, { useState, useEffect, useRef } from 'react'

interface IPhoneInputMobi {
    value: string
    onChange: (value: string) => void
    onError: (value: string) => void
    onBlur?: (value: string) => void
    error?: boolean
    validationStatus?: boolean
    className?: string
    wrapperClassName?: string
    showInternalError?: boolean
    required?: boolean
    labelClassName?: string
    placeholder?: string
    noLabel?: boolean
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
    onBlur,
    error,
    className,
    wrapperClassName,
    labelClassName,
    noLabel,
}) => {
    const [inputValue, setInputValue] = useState<string>(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)

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
            console.log(e)
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
    }

    const handleBlur = () => {
        onBlur?.(inputValue)
        setIsFocused(false)
    }

    const handleFocus = () => {
        setIsFocused(true)
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
            <label
                htmlFor="phone"
                className={`mb-1 text-2xl font-medium text-white ${labelClassName} ${noLabel ? 'hidden' : ''}`}
            >
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
                placeholder={isFocused ? PHONE_MASK : 'Номер телефона*'}
                className={`input-form-mobi-custom ${isFocused && 'focus:border-2 focus:border-[#FFFFFF] focus:ring-transparent focus:placeholder:text-[#FFFFFF]'} ${error ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]' : 'border-[#878797] focus:border-[#878797]'} ${className}`}
            />
        </div>
    )
}

export default PhoneInputMobi
