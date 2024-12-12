import React from 'react'
import { CheckedBoxFormDesktop, UncheckedBoxFormDesktop } from '@/components/assets/icons'

interface CheckboxProps {
    id: string
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
}

const CheckBoxInputMobi: React.FC<CheckboxProps> = ({ id, checked, onChange, label }) => {
    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="peer hidden"
            />
            <button
                type="button"
                className="cursor-pointer flex items-center justify-center rounded transition-all"
                onClick={() => onChange(!checked)}
            >
                {checked ? (
                    <CheckedBoxFormDesktop className="w-[18px]" />
                ) : (
                    <UncheckedBoxFormDesktop className="w-[16px]" />
                )}
            </button>
            <label htmlFor={id} className={`text14px_mobi font-medium ${checked ? 'text-white' : 'text-[#878797]'}`}>
                {label}
            </label>
        </div>
    )
}

export default CheckBoxInputMobi
