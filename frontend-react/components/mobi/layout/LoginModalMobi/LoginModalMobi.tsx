'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import EmailInputMobi from '../../shared/formInput/EmailInputMobi'
import PasswordInputMobi from '../../shared/formInput/PasswordInputMobi'

interface LoginFormData {
    email: string
    password: string
}

interface LoginModalMobiProps {
    closeModal: () => void
    openRegistrationModal: () => void
}

const LoginModalDesktop: React.FC<LoginModalMobiProps> = ({ closeModal, openRegistrationModal }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex w-[90%] max-w-[500px] flex-col items-center rounded-[50px] bg-[url('/images/Subtract_modalCall_png.png')] bg-cover bg-no-repeat">
                <button
                    onClick={closeModal}
                    className="absolute -right-1 -top-1 rounded-[50px] bg-[#101030] bg-opacity-80"
                >
                    <X size={30} color="#878797" />
                </button>
                <h1 className="text18px_mobi bg-sub-title-gradient-mobi mx-auto mb-1 mt-6 inline bg-clip-text font-semibold uppercase text-transparent">
                    Вход
                </h1>
                <form onSubmit={handleSubmit} className="flex w-4/5 flex-col align-middle">
                    <div className="mb-2">
                        <EmailInputMobi
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            onError={(error) => handleError('email', error)}
                            inputClassName="input-form-mobi-custom"
                            labelClassName="label-form-mobi-custom"
                            errorClassName="error-form-mobi-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            // externalError={errors.email}
                            required={true}
                        />
                    </div>
                    <div className="relative mb-2">
                        <PasswordInputMobi
                            value={formData.password}
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={(value) => handleChange('password', value)}
                            onError={(error) => handleError('email', error)}
                            labelClassName="label-form-mobi-custom"
                            inputClassName="input-form-mobi-custom"
                            errorClassName="error-form-mobi-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            // externalError={errors.password}
                            required={true}
                        />
                    </div>
                    <button className="text14px_mobi self-end border-transparent bg-transparent font-semibold text-[#878797] underline">
                        Забыли пароль?
                    </button>
                    {formError && <p className="error-form-mobi-custom">Заполните необходимые поля</p>}
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError}
                        className="bg-gradient-desktop sm_xl:text-3xl sm_l:text-2xl sm_s:text-xl hover:bg-gradient-desktop-hover mx-auto mt-6 w-4/5 rounded-[50px] text-4xl font-medium sm:text-xl md:text-4xl"
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
    )
}

export default LoginModalDesktop
