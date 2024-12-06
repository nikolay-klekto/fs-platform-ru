import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    labelClassName?: string
    inputClassName?: string
}

const PhoneInputMobi: React.FC<PhoneInputProps> = ({ value, onChange, labelClassName, inputClassName }) => {
    const [mask, setMask] = useState<string>('+375 (99) 999-99-99')

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const cleanedValue = inputValue.replace(/\D/g, '')

        if (cleanedValue.startsWith('375')) {
            setMask('+375 (99) 999-99-99')
        } else if (cleanedValue.startsWith('7')) {
            setMask('+7 (999) 999-99-99')
        }

        onChange(inputValue)
    }

    useEffect(() => {
        setMask(value.startsWith('375') ? '+375 (99) 999-99-99' : '+7 (999) 999-99-99')
    }, [value])

    return (
        <div>
            <label htmlFor="phone" className={labelClassName}>
                Номер телефона
            </label>
            <InputMask
                mask={mask}
                value={value}
                onChange={handlePhoneChange}
                className={inputClassName}
                placeholder="+375(__)___-__-__"
            />
        </div>
    )
}

export default PhoneInputMobi
