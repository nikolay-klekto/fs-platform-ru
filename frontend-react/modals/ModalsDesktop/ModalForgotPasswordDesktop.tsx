'use client'

import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { Button } from '@/components/ui/button'

import { X } from 'lucide-react'

interface IForgotPasswordData {
    email: string
}

interface IModalContent {
    onClose: () => void
}

const ModalForgotPasswordDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [passwordData, setPasswordData] = useState<IForgotPasswordData>({
        email: '',
    })

    const [inputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
    })

    const [inputTouched, setInputTouched] = useState({
        email: false,
    })

    const handleInputBlur = (field: 'email') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    const isEmailValid = !Boolean(validateEmailDesktop(passwordData.email).styleError)
    const isFormValid = isEmailValid && passwordData.email.trim() !== ''
    const [isSubmitted, setIsSubmitted] = useState(false)
    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className=" flex max-w-[578px] flex-col">
                <h3 className="text28px_desktop mb-7 mt-10 bg-gradient-desktop bg-clip-text text-center font-medium text-transparent">
                    ЗАБЫЛИ ПАРОЛЬ?
                </h3>
                <div className="flex w-full flex-col px-[76px]">
                    <p className="custom-grey text18px_desktop mb-5 w-full max-w-[426px] text-left font-medium ">
                        Чтобы получить доступ к аккаунту, введите e-mail адрес, который вы указали при регистрации
                    </p>
                    <EnhancedInput
                        type="email"
                        name="email"
                        placeholder="Ваш e-mail"
                        value={passwordData.email}
                        onBlur={() => handleInputBlur('email')}
                        validate={(value) => validateEmailDesktop(value)}
                        onChange={(value) => setPasswordData((prev) => ({ ...prev, email: value }))}
                        className={`${
                            inputTouched.email && validateEmailDesktop(passwordData.email).styleError
                                ? 'border-[#bc8070] focus:border-[#bc8070] '
                                : 'border-[#878797] focus:border-[rgb(135,135,151)]'
                        }  h-[50px] w-full max-w-[426px] rounded-[50px] border-2 bg-transparent 
 mb-[14px] pl-[20px] text-[18px] 4xl:text-4xl 3xl:text-2xl 2xl:text-xl font-medium opacity-80   placeholder:text-[#353652]/40 focus:ring-0 focus:ring-offset-0 `}
                        label="Почта"
                        labelClassName="mb-1 text15px_desktop font-medium text-white"
                        wrapperClassName="w-full max-w-[426px]"
                    />
                    {inputInternalErrors.email && (
                        <p className="error-form-desktop-custom" helperTextClassName="text-[15px]">
                            {inputInternalErrors.email}
                        </p>
                    )}
                </div>
                <div className="mt-[2px] px-[76px]">
                    <p className="text15px_desktop font-medium text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <a href="href" className="hover:cursor text15px_desktop font-medium  text-[#353652] underline">
                            Конфиденциальность
                        </a>{' '}
                        и{' '}
                        <a href="href" className="text15px_desktop mb-4 font-medium text-[#353652] underline">
                            Условия использования
                        </a>
                    </p>
                </div>
                <div className="mb-6 mt-5 flex justify-center">
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        onClick={() => {
                            setIsSubmitted(true)
                            setInputTouched((prev) => ({ ...prev, email: true }))
                        }}
                        className={`mx-auto flex h-16 w-[70%] items-center justify-center rounded-[50px] text-5xl font-semibold ${
                            !isSubmitted || isFormValid
                                ? 'bg-gradient-desktop hover:bg-gradient-desktop-hover'
                                : 'bg-[#878797] text-[#353652] hover:bg-[#878797]'
                        }`}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalForgotPasswordDesktop
