'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'

interface IForgotPasswordData {
    email: string
}

interface IModalContent {
    onClose: () => void
}

const ModalForgotPasswordMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [passwordData, setPasswordData] = useState<IForgotPasswordData>({
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
                <div className=" rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat py-[40px]">
                    <p className="mb-5 bg-sub-title-gradient-mobi bg-clip-text text-center text-4xl font-semibold text-transparent md:text-4xl">
                        ЗАБЫЛИ ПАРОЛЬ?
                    </p>
                    <div className="flex w-full flex-col pl-[18px] pr-[6px]">
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
                            } placeholder:text14px_mobi h-12 w-full rounded-[50px] border-2 bg-transparent text-white placeholder:text-[#353652]/50`}
                            label="Почта*"
                            labelClassName="text14px_mobi font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                        )}
                        <p className="text12px_mobi mt-2 font-medium text-[#353652]">*Обязательное поле для ввода</p>
                    </div>
                    <p className="custom-grey text12px_mobi mt-2 pl-[18px] font-medium ">
                        Введите e-mail, указанный при регистрации
                    </p>
                    <button
                        type="submit"
                        className=" mx-auto mt-7 flex h-12 w-[85%] items-center justify-center rounded-[50px] bg-sub-title-gradient-mobi text-3xl font-semibold 
                        text-white disabled:bg-[#878797] md:text-4xl"
                    >
                        Далее
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalForgotPasswordMobi
