'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'
import EmailInputMobi from '../../shared/formInput/EmailInputMobi'
import PasswordInputMobi from '../../shared/formInput/PasswordInputMobi'
import PhoneInputMobi from '../../shared/formInput/PhoneInputMobi'
import CheckBoxInputMobi from '../../shared/formInput/CheckBoxInputMobi'

interface RegistrationFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
    subscribe: boolean
    agree: boolean
}

interface RegistrationModalMobiProps {
    closeModal: () => void
    openLoginModal: () => void
}

const RegistrationModalMobi: React.FC<RegistrationModalMobiProps> = ({ closeModal, openLoginModal }) => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
        agree: false,
    })

    const [formError, setFormError] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        confirmPassword: '',
        agree: '',
    })

    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: '',
        agree: '',
    })

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }))
    }

    const validateForm = (): boolean => {
        const hasEmptyFields =
            formData.email === '' ||
            formData.phone === '' ||
            formData.password === '' ||
            formData.confirmPassword === '' ||
            formData.agree !== true

        const hasErrors = Object.values(errors).some((error) => error !== null && error !== '')
        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasErrors || hasInternalErrors
    }

    const handleChange = (field: keyof RegistrationFormData, value: string | boolean) => {
        setFormData((prev) => {
            const updatedFormData = {
                ...prev,
                [field]: value,
            }

            if (field === 'confirmPassword' && typeof value === 'string') {
                if (value !== updatedFormData.password) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: 'Пароли не совпадают',
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: '',
                    }))
                }
            }

            if (field === 'password' && typeof value === 'string') {
                if (updatedFormData.confirmPassword && value !== updatedFormData.confirmPassword) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: 'Пароли не совпадают',
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: '',
                    }))
                }
            }

            if (field === 'agree' && typeof value === 'boolean') {
                if (!value) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        agree: 'Необходимо согласиться с условиями использования',
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        agree: '',
                    }))
                }
            }

            return updatedFormData
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
            console.log('Ошибка: Заполните все поля корректно или исправьте ошибки')
        } else {
            setFormError(false)
            console.log('Форма отправлена:', formData)
            closeModal()
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, errors, inputInternalErrors])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative rounded-[50px] bg-[url('/images/Subtract_modalCall_png.png')] bg-cover bg-no-repeat flex flex-col items-center w-[90%] max-w-[500px]">
                <button
                    onClick={closeModal}
                    className="absolute -top-1 -right-1 rounded-[50px] bg-[#101030] bg-opacity-80"
                >
                    <X size={30} color="#878797" />
                </button>
                <h1 className="text18px_mobi font-semibold bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-1 mx-auto uppercase inline">
                    Регистрация
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col align-middle w-[80%]">
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <PhoneInputMobi
                            value={formData.phone}
                            onChange={(value) => handleChange('phone', value)}
                            onError={(error) => handleError('phone', error)}
                            inputClassName="input-form-mobi-custom"
                            labelClassName="label-form-mobi-custom"
                            errorClassName="error-form-mobi-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            // externalError={errors.phone}
                            required={true}
                        />
                    </div>
                    <div className="mb-3 relative">
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
                            showGenerateButton={true}
                            // externalError={errors.password}
                            required={true}
                        />
                    </div>
                    <div className="mb-3 relative">
                        <PasswordInputMobi
                            value={formData.confirmPassword}
                            label="Повторите пароль"
                            placeholder="Повторите пароль"
                            onChange={(value) => handleChange('confirmPassword', value)}
                            onError={(error) => handleError('confirmPassword', error)}
                            labelClassName="label-form-mobi-custom"
                            inputClassName="input-form-mobi-custom"
                            errorClassName="error-form-mobi-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            // externalError={errors.confirmPassword}
                            required={true}
                        />
                        {errors.confirmPassword && <p className=" error-form-mobi-custom">{errors.confirmPassword}</p>}
                    </div>
                    <div className="mt-2 mb-1">
                        <CheckBoxInputMobi
                            id="subscribe"
                            checked={formData.subscribe}
                            onChange={(checked) => handleChange('subscribe', checked)}
                            label="Подписаться на рассылку"
                        />
                    </div>
                    <div className="mb-2">
                        <CheckBoxInputMobi
                            id="agree"
                            checked={formData.agree}
                            onChange={(checked) => handleChange('agree', checked)}
                            label="Согласен с условиями использования"
                        />
                        {errors.agree && <p className="error-form-mobi-custom">{errors.agree}</p>}
                    </div>
                    {formError && <p className="error-form-mobi-custom">Заполните необходимые поля</p>}
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError}
                        className="mx-auto bg-gradient-desktop text-4xl md:text-4xl sm_xl:text-3xl sm_l:text-2xl sm_s:text-xl sm:text-xl font-medium rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[70%] sm_l:w-[80%] sm_s:w-[80%] sm:w-[80%]"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className="mt-5 mb-6 flex justify-center text14px_mobi">
                    <p className="mr-2 text-[#878797] font-medium">Уже зарегистрированы?</p>
                    <button
                        className="underline bg-transparent border-transparent text-white font-medium"
                        onClick={openLoginModal}
                    >
                        Войти в аккаунт
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationModalMobi
