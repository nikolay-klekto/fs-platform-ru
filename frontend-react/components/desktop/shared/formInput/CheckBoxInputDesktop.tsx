import React from 'react'
import { CheckedBoxFormDesktop, UncheckedBoxFormDesktop } from '@/components/assets/icons'

interface CheckBoxInputProps {
    id: string
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    labelClassName?: string
    checkboxClassName?: string
}

// const CheckBoxInputDesktop: React.FC<CheckBoxInputProps> = ({
//     checked,
//     onChange,
//     label,
//     labelClassName,
//     checkboxClassName,
// }) => {
//     return (
//     )
// }

// export default CheckBoxInputDesktop
