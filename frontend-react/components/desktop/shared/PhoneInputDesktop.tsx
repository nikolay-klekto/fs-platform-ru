import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    labelClassName?: string
    inputClassName?: string
}

const PhoneInputDesktop: React.FC<PhoneInputProps> = ({ value, onChange, labelClassName, inputClassName }) => {
    const [mask, setMask] = useState<string>('+9')

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const cleanedValue = inputValue.replace(/\D/g, '')

        if (cleanedValue.startsWith('3')) {
            setMask('+375 (99) 999-99-99')
        } else if (cleanedValue.startsWith('7')) {
            setMask('+7 (999) 999-99-99')
        }

        onChange(inputValue)
    }

    useEffect(() => {
        if (value.startsWith('375')) {
            setMask('+375 (99) 999-99-99')
        } else if (value.startsWith('7')) {
            setMask('+7 (999) 999-99-99')
        }
    }, [value])

    const handleBlur = () => {
        setMask('+9')
    }

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
                className={inputClassName}
                placeholder={'+375 (__) ___-__-__'}
            />
        </div>
    )
}

export default PhoneInputDesktop
