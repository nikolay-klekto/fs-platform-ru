'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import PasswordInputMobi from '@/components/mobi/shared/formInput/PasswordInputMobi'
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
    }, [formData, inputInternalErrors])

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [validateForm])

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
        openModal('forgot_password_mobi', 'mobi')
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
            <div className="relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                >
                    <X size={30} color="#878797" />
                </button>
                <div className="relative flex max-w-[500px]  flex-col items-center rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat">
                    <h1 className="text18px_mobi mx-auto mb-1 mt-6 inline bg-sub-title-gradient-mobi bg-clip-text font-semibold uppercase text-transparent">
                        Вход
                    </h1>
                    <form onSubmit={handleSubmit} className="flex w-4/5 flex-col align-middle">
                        <div className="mb-2">
                            <EnhancedInput
                                type="email"
                                name="email"
                                placeholder="Ваш e-mail"
                                value={formData.email}
                                onBlur={() => handleInputBlur('email')}
                                validate={(value) => validateEmailMobi(value)}
                                onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                                className={`${
                                    inputTouched.email && validateEmailMobi(formData.email).styleError
                                        ? 'border-[#bc8070] focus:border-[#bc8070] '
                                        : 'border-[#878797] focus:border-[#878797]'
                                } h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white`}
                                label="Почта*"
                                labelClassName="mb-1 text14px_mobi font-medium text-white"
                                wrapperClassName="w-full"
                            />
                            {inputInternalErrors.email && (
                                <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                            )}
                        </div>
                        <div className="relative mb-2">
                            <PasswordInputMobi
                                value={formData.password}
                                label="Пароль"
                                placeholder="Пароль"
                                onChange={(value) => handleChange('password', value)}
                                onError={(error) => handleError('password', error)}
                                labelClassName="label-form-mobi-custom"
                                inputClassName="input-form-mobi-custom"
                                errorClassName="error-form-mobi-custom"
                                inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                                inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                                required={true}
                            />
                        </div>
                        <button
                            onClick={openForgotPassowrdModal}
                            className="text14px_mobi self-end border-transparent bg-transparent font-semibold text-[#878797] underline"
                        >
                            Забыли пароль?
                        </button>
                        {formError && <p className="error-form-mobi-custom">Заполните необходимые поля</p>}
                        <Button
                            type="submit"
                            variant="default"
                            size="btn_modal_desktop"
                            disabled={formError}
                            className="mx-auto mt-6 w-4/5 rounded-[50px] bg-gradient-desktop text-4xl font-medium hover:bg-gradient-desktop-hover sm:text-xl md:text-4xl sm_s:text-xl sm_l:text-2xl sm_xl:text-3xl"
                        >
                            Войти
                        </Button>
                    </form>
                    <div className="text14px_mobi mb-6 mt-5 flex justify-center">
                        <p className="mr-2 font-medium text-[#878797]">Нет аккаунта?</p>
                        <button
                            className="border-transparent bg-transparent font-medium text-white underline"
                            onClick={openRegistrationModal}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModalDesktop
