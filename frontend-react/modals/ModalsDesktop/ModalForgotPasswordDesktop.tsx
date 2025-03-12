'use client'

import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { Button } from '@/components/ui/button'

import { X } from 'lucide-react'

interface ForgotPasswordData {
    email: string
}

interface ForgotPasswordDataProps {
    onClose: () => void
}

const ModalForgotPasswordDesktop: React.FC<ForgotPasswordDataProps> = ({ onClose }) => {
    const [passwordData, setPasswordData] = useState<ForgotPasswordData>({
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

    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className=" flex max-w-[578px] flex-col">
                <h3 className="text28px_desktop mb-2 mt-[40px] bg-gradient-desktop bg-clip-text text-center font-medium text-transparent">
                    ЗАБЫЛИ ПАРОЛЬ?
                </h3>
                <p className="custom-grey text18px_desktop px-[3.96vw] font-medium ">
                    Чтобы получить доступ к аккаунту, введите e-mail адрес, который вы указали при регистрации
                </p>
                <div className="flex w-full flex-col px-[3.96vw]">
                    <EnhancedInput
                        type="email"
                        name="email"
                        placeholder="Почта"
                        value={passwordData.email}
                        onBlur={() => handleInputBlur('email')}
                        validate={(value) => validateEmailDesktop(value)}
                        onChange={(value) => setPasswordData((prev) => ({ ...prev, email: value }))}
                        className={`${
                            inputTouched.email && validateEmailDesktop(passwordData.email).styleError
                                ? 'border-[#bc8070] focus:border-[#bc8070] '
                                : 'border-[#878797] focus:border-[#878797]'
                        } h-10 w-full rounded-[20px] border bg-transparent px-4 text-xl font-medium text-white`}
                        label="Почта"
                        labelClassName="mt-2 mb-1 text15px_desktop font-medium text-white"
                        wrapperClassName="w-full"
                    />
                    {inputInternalErrors.email && (
                        <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                    )}
                </div>
                <div className="mt-2 px-[3.96vw]">
                    <p className="text15px_desktop font-medium text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <a
                            href="href"
                            className="hover:cursor ml-1 text-2xl font-medium leading-[18px] text-[#353652] underline"
                        >
                            Конфиденциальность
                        </a>{' '}
                        <br />и{' '}
                        <a
                            href="href"
                            className="mb-4 ml-1 text-2xl font-medium leading-[18px] text-[#353652] underline"
                        >
                            Условия использования
                        </a>
                    </p>
                </div>
                <div className="mb-10 mt-5 flex justify-center">
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        className="mx-auto mb-3 rounded-full bg-gradient-desktop px-20 text-5xl leading-6 hover:bg-gradient-desktop-hover "
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalForgotPasswordDesktop
