'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import PasswordInputDesktop from '@/components/desktop/shared/formInput/PasswordInputDesktop'
import { useModal } from '@/context/ContextModal'

interface ILoginFormData {
    email: string
    password: string
}

interface IModalContent {
    onClose: () => void
}

const LoginModalDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<ILoginFormData>({
        email: '',
        password: '',
    })
    const { openModal } = useModal()
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

    const validateForm = useCallback((): boolean => {
        const hasEmptyFields = formData.email === '' || formData.password === ''

        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasInternalErrors
    }, [formData.email, formData.password, inputInternalErrors])

    const handleChange = (field: keyof ILoginFormData, value: string | boolean) => {
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
            onClose()
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, inputInternalErrors, validateForm])

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
        onClose()
        openModal('registration_desktop', 'desktop')
    }

    const openForgotPassowrdModal = () => {
        onClose()
        openModal('forgot_password_desktop', 'desktop')
    }

    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div className="mx-auto flex w-[73%] flex-col items-center justify-center pb-[30px] pt-[40px]">
                <button onClick={onClose} className="absolute right-[5%] top-[5%] w-[7%]">
                    <X size={41} color="#878797" className="w-full opacity-50 hover:opacity-100" />
                </button>
                <h2 className="text36px_desktop text-gradient_desktop_custom mb-7 inline font-medium uppercase 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                    Вход
                </h2>
                <form onSubmit={handleSubmit} className="flex w-full flex-col align-middle">
                    <div className="mb-5">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={formData.email}
                            onBlur={() => handleInputBlur('email')}
                            validate={(value) => validateEmailDesktop(value)}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, email: value }))
                                setFormError(!validateForm)
                            }}
                            className={`${
                                (inputTouched.email && validateEmailDesktop(formData.email).styleError) || formError
                                    ? 'border-[#bc8070] focus:bg-[#1f203f]'
                                    : 'input-form-desktop-custom border-[#878797]'
                            } h-10 w-full rounded-[20px] border-2 bg-transparent p-3 text-xl font-medium text-white outline-none placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                            label="Почта"
                            labelClassName="mb-1 text-2xl font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                        )}
                    </div>
                    <div className="relative mb-5">
                        <PasswordInputDesktop
                            value={formData.password}
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={(value) => {
                                handleChange('password', value)
                                setFormError(!validateForm)
                            }}
                            onError={(error) => handleError('password', error)}
                            labelClassName="label-form-desktop-custom text-2xl mb-1"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            formError={formError}
                            showGenerateButton={true}
                            required={true}
                        />
                    </div>
                    <div className={`flex w-full ${formError ? 'justify-between' : 'justify-end'}`}>
                        {formError && <p className="error-form-desktop-custom">Введите e-mail и пароль</p>}
                        <button className="text15px_desktop border-transparent bg-transparent font-semibold text-[#878797]">
                            Забыли пароль?
                        </button>
                    </div>
                    <div className="w-[95%]">
                        <p className="text15px_desktop mt-3 font-medium text-[#353652]">
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
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError}
                        className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-6 h-[64px] w-[64%] rounded-[50px] text-5xl font-semibold disabled:cursor-not-allowed disabled:bg-[#878789] disabled:bg-none disabled:text-[#CBD6EF] disabled:opacity-100 disabled:hover:bg-none"
                    >
                        Войти
                    </Button>
                </form>
                <div className="text15px_desktop mt-5 flex justify-center">
                    <p className="mr-2 font-medium text-[#878797]">Нет аккаунта?</p>
                    <button
                        className="border-transparent bg-transparent font-medium text-white underline"
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
