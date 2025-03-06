'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { Button } from '@/components/ui/button'
import { useModal } from '@/context/ContextModal'
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
    const { openModal } = useModal()
    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
    })

    const [setError] = useState(false)

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }))
    }

    const validateEmail = useCallback((): boolean => {
        const hasEmptyFields = passwordData.email === ''
        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasInternalErrors
    }, [passwordData.email, inputInternalErrors])

    // const handleChange = (field: keyof ForgotPasswordData, value: string) => {
    //     setPasswordData((prev) => ({
    //         ...prev,
    //         [field]: value,
    //     }))
    // }

    useEffect(() => {
        if (!validateEmail()) {
            setError(false)
        }
    }, [passwordData, inputInternalErrors, validateEmail, setError])

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

    // const openForgotPassowrdModal = () => {
    //     onClose()
    //     openModal('forgot_password_desktop', 'desktop')
    // }

    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto flex max-w-[578px] flex-col">
                <h3 className="text28px_desktop bg-gradient-desktop bg-clip-text text-center font-medium text-transparent">
                    ЗАБЫЛИ ПАРОЛЬ
                </h3>
                <p className="custom-grey text18px_desktop font-medium ">
                    Чтобы получить доступ к аккаунту, введите <br />
                    e-mail адрес, который вы указали при
                    <br /> регистрации
                </p>
                <div className="">
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
                        } h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white`}
                        label="Почта"
                        labelClassName="mb-1 text15px_desktop font-medium text-white"
                        wrapperClassName="w-full"
                    />
                    {inputInternalErrors.email && (
                        <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                    )}
                </div>
                <div className="">
                    <p className=" text15px_desktop font-medium text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <a
                            href="href"
                            className="hover:cursor text-2xl font-medium leading-[18px] text-[#353652] underline"
                        >
                            Конфиденциальность
                        </a>{' '}
                        <br />и{' '}
                        <a href="href" className="mb-4 text-2xl font-medium leading-[18px] text-[#353652] underline">
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
