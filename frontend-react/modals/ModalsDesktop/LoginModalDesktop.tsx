'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import PasswordInputDesktop from '@/components/desktop/shared/formInput/PasswordInputDesktop'
import { useModal } from '@/context/ContextModal'

interface LoginFormData {
    email: string
    password: string
}

const LoginModalDesktop: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const { closeModal, openModal } = useModal()
    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        password: '',
    })

    const [formError, setFormError] = useState(false)

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }))
    }

    const validateForm = (): boolean => {
        const hasEmptyFields = formData.email === '' || formData.password === ''

        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasInternalErrors
    }

    const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
            console.log('Ошибка: Заполните все поля корректно или исправьте ошибки')
        } else {
            setFormError(false)
            console.log('Форма входа отправлена:', formData)
            closeModal()
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, inputInternalErrors])

    const [inputTouched, setInputTouched] = useState({
        email: false,
        phone: false,
    })

    const handleInputBlur = (field: 'phone' | 'email') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    const openRegistrationModal = () => {
        closeModal()
        openModal('registration_desktop', 'desktop')
    }

    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div className="flex flex-col justify-center items-center pt-[40px] pb-[30px] w-[73%] mx-auto">
                <button onClick={closeModal} className="absolute top-[5%] right-[5%] w-[7%]">
                    <X size={41} color="white" className="opacity-70 w-full" />
                </button>
                <h2 className="mb-7 4xl:mb-6 3xl:mb-5 2xl:mb-4 text36px_desktop font-medium text-gradient_desktop_custom uppercase inline">
                    Вход
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col align-middle w-full">
                    <div className="mb-5">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={formData.email}
                            onBlur={() => handleInputBlur('email')}
                            validate={(value) => validateEmailDesktop(value)}
                            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                            className={`${
                                inputTouched.email && validateEmailDesktop(formData.email).styleError
                                    ? 'border-[#bc8070] focus:border-[#bc8070] '
                                    : 'border-[#878797] focus:border-[#878797]'
                            } border rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white`}
                            label="Почта*"
                            labelClassName="mb-1 text-2xl font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                        )}
                    </div>
                    <div className="mb-5 relative">
                        <PasswordInputDesktop
                            value={formData.password}
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={(value) => handleChange('password', value)}
                            onError={(error) => handleError('password', error)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            showGenerateButton={true}
                            required={true}
                        />
                    </div>
                    <button className="bg-transparent border-transparent self-end text-[#878797] font-semibold text15px_desktop">
                        Забыли пароль?
                    </button>
                    <div className="w-[95%]">
                        <p className="mt-3 text-[#353652] font-medium text15px_desktop">
                            Защита от спама reCAPTCHA{' '}
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                                Конфиденциальность
                            </Link>{' '}
                            и{' '}
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                                Условия использования
                            </Link>
                        </p>
                    </div>
                    {formError && <p className="error-form-desktop-custom">Заполните необходимые поля</p>}
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError}
                        className="mx-auto bg-gradient-desktop text-5xl 4xl:text-3xl 3xl:text-2xl 2xl:text-lg font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[64%]"
                    >
                        Войти
                    </Button>
                </form>
                <div className="mt-5 flex justify-center text15px_desktop">
                    <p className="mr-2 text-[#878797] font-medium">Нет аккаунта?</p>
                    <button
                        className="underline bg-transparent border-transparent text-white font-medium"
                        onClick={openRegistrationModal}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModalDesktop
