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
    const isEmailValid = !Boolean(validateEmailMobi(passwordData.email).styleError)
    const isFormValid = isEmailValid && passwordData.email.trim() !== ''
    const [isSubmitted, setIsSubmitted] = useState(false)

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
            <div className="relative mx-4 w-full max-w-[346px]">
                <button
                    onClick={onClose}
                    className="absolute right-1 top-0 translate-x-1 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                >
                    <X size={24} color="#878797" className="hover:opacity-100" />
                </button>
                <div className="  bg-[url('/background/Subtract_modalCaForgotPass_png.png')] bg-cover bg-[right_top] bg-no-repeat py-[40px]">
                    <p className="mb-5 bg-sub-title-gradient-mobi bg-clip-text text-center text-4xl font-semibold text-transparent md:text-4xl">
                        ЗАБЫЛИ ПАРОЛЬ?
                    </p>
                    <div className="flex w-full flex-col pl-[13px] pr-[12px]">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            value={passwordData.email}
                            onBlur={() => handleInputBlur('email')}
                            validate={(value) => validateEmailMobi(value)}
                            onChange={(value) => setPasswordData((prev) => ({ ...prev, email: value }))}
                            className={`${
                                inputTouched.email && validateEmailMobi(passwordData.email).styleError
                                    ? 'border-[#bc8070] focus:border-[#bc8070] '
                                    : 'border-[#878797] focus:border-[#878797]'
                            } placeholder:text14px_mobi h-11 w-full rounded-[50px] border-2 bg-transparent pl-[20px] text-white placeholder:text-[#353652]/50 focus:ring-0 focus:ring-offset-0`}
                            label="Почта"
                            labelClassName="text14px_mobi font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                        )}
                    </div>
                    <p className="custom-grey text12px_mobi mt-2 py-[2px] pl-[13px] font-medium ">
                        Введите e-mail, указанный при регистрации
                    </p>
                    <button
                        type="submit"
                        onClick={() => {
                            setIsSubmitted(true)
                            setInputTouched((prev) => ({ ...prev, email: true }))
                        }}
                        className={`mx-auto mt-7 flex h-12 w-[85%] items-center justify-center rounded-[50px]  text-3xl font-semibold 
                        md:text-4xl ${
                            !isSubmitted || isFormValid
                                ? 'bg-sub-title-gradient-mobi  text-white  hover:bg-gradient-desktop-hover'
                                : 'bg-[#878797] text-[#353652] hover:bg-[#878797]'
                        }`}
                    >
                        Далее
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalForgotPasswordMobi
