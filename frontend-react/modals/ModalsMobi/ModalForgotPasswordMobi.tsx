'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'

interface ForgotPasswordData {
    email: string
}

interface ForgotPasswordDataMobiProps {
    onClose: () => void
}

const ModalForgotPasswordMobi: React.FC<ForgotPasswordDataMobiProps> = ({ onClose }) => {
    const [passwordData, setPasswordData] = useState<ForgotPasswordData>({
        email: '',
    })

    const [inputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
    })

    const [inputTouched, setInputTouched] = useState({
        email: false,
        phone: false,
    })

    const handleInputBlur = (field: 'email') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
            <div className="relative mx-4 w-full max-w-[346px]">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                >
                    <X size={24} color="#878797" className="opacity-50 hover:opacity-100" />
                </button>
                <div className=" rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                    <p className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                        ЗАБЫЛИ ПАРОЛЬ?
                    </p>
                    <div className="flex w-full flex-col px-[18px]">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={passwordData.email}
                            onBlur={() => handleInputBlur('email')}
                            validate={(value) => validateEmailMobi(value)}
                            onChange={(value) => setPasswordData((prev) => ({ ...prev, email: value }))}
                            className={`${
                                inputTouched.email && validateEmailMobi(passwordData.email).styleError
                                    ? 'border-[#bc8070]  '
                                    : 'border-[#878797]'
                            } text14px_mobi h-12 w-full rounded-[20px] border-2 bg-transparent placeholder:text-[#353652]/70 text-white`}
                            label="Почта*"
                            labelClassName="mb-1 text14px_mobi text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                        )}
                        <p className="mb-3 mt-2 text12px_mobi font-medium text-[#353652]">
                            *Обязательное поле для ввода
                        </p>
                    </div>
                    <p className="custom-grey text18px_desktop text12px_mobi mt-2 ">
                        Введите e-mail, указанный при регистрации
                    </p>
                    <button
                        type="submit"
                        className=" flex justify-center items-center h-12 mx-auto w-[92%] rounded-[50px] bg-sub-title-gradient-mobi text-3xl font-semibold 
                        disabled:bg-[#878797] text-white md:text-4xl"
                    >
                        Далее
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalForgotPasswordMobi
