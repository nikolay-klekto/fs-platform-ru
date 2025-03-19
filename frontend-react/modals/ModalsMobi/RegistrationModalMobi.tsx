'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import PasswordInputMobi from '@/components/mobi/shared/formInput/PasswordInputMobi'
import { useModal } from '@/context/ContextModal'

interface IRegistrationFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
    subscribe: boolean
    agree: boolean
}
interface IModalContent {
    onClose: () => void
}

const RegistrationModalMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IRegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
        agree: false,
    })
    const { openModal } = useModal()
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

    const validateForm = useCallback((): boolean => {
        const hasEmptyFields =
            formData.email === '' ||
            formData.phone === '' ||
            formData.password === '' ||
            formData.confirmPassword === '' ||
            formData.agree !== true

        const hasErrors = Object.values(errors).some((error) => error !== null && error !== '')
        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasErrors || hasInternalErrors
    }, [formData, errors, inputInternalErrors])

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [validateForm])

    const handleChange = (field: keyof IRegistrationFormData, value: string | boolean) => {
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
    const openLoginModal = () => {
        onClose()
        openModal('login_mobi', 'mobi')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70]">
            <div className="relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80]"
                >
                    <X size={44} color="#878797" />
                </button>
                <div className="relative flex max-w-[500px] flex-col items-center rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat">
                    <h1 className="text18px_mobi bg-sub-title-gradient-mobi mx-auto mb-1 mt-6 inline bg-clip-text font-semibold uppercase text-transparent">
                        Регистрация
                    </h1>
                    <form onSubmit={handleSubmit} className="flex w-4/5 flex-col align-middle">
                        <div className="mb-3">
                            <EnhancedInput
                                type="email"
                                name="email"
                                placeholder="Почта"
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
                                labelClassName="mb-1 text-2xl font-medium text-white"
                                wrapperClassName="w-full"
                            />
                            {inputInternalErrors.email && (
                                <p className="error-form-desktop-custom">{inputInternalErrors.email}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <EnhancedInput
                                type="tel"
                                name="phone"
                                placeholder="Номер телефона"
                                value={formData.phone}
                                onBlur={() => handleInputBlur('phone')}
                                validate={(value) => validatePhoneMobi(value)}
                                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                className={`${
                                    inputTouched.phone && validatePhoneMobi(formData.phone).styleError
                                        ? 'border-[#bc8070] focus:border-[#bc8070]'
                                        : 'border-[#878797] focus:border-[#878797]'
                                } h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white`}
                                label="Телефон*"
                                labelClassName="mb-1 text-2xl font-medium text-white"
                                wrapperClassName="w-full"
                                mask="+375 (99) 999-99-99"
                                maskPlaceholder="_"
                            />
                            {inputInternalErrors.phone && (
                                <p className="error-form-desktop-custom">{inputInternalErrors.phone}</p>
                            )}
                        </div>
                        <div className="relative mb-3">
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
                                required={true}
                            />
                        </div>
                        <div className="relative mb-3">
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
                                required={true}
                            />
                            {errors.confirmPassword && (
                                <p className=" error-form-mobi-custom">{errors.confirmPassword}</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <EnhancedInput
                                type="checkbox"
                                name="subscribe"
                                checked={formData.subscribe}
                                onChange={(value) => setFormData((prev) => ({ ...prev, subscribe: value === 'true' }))}
                                label="Я согласен(а) на обработку персональных данных"
                                wrapperClassName="flex gap-2 pb-2"
                                labelClassName={`${formData.subscribe ? 'text-white' : 'text-[#878797]'}`}
                            />
                        </div>
                        <div className="mb-2">
                            <EnhancedInput
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                validate={(value) => {
                                    const error = !value ? 'Вы должны согласиться с условиями' : ''
                                    return {
                                        textError: error,
                                        status: !error,
                                        styleError: Boolean(error),
                                    }
                                }}
                                onChange={(value) => setFormData((prev) => ({ ...prev, agree: value === 'true' }))}
                                label="Я согласен(а) получать новости о стажировках"
                                wrapperClassName="flex gap-2 pb-2"
                                labelClassName={`${formData.agree ? 'text-white' : 'text-[#878797]'}`}
                            />
                            {errors.agree && <p className="error-form-desktop-custom">{errors.agree}</p>}
                        </div>
                        {formError && <p className="error-form-mobi-custom">Заполните необходимые поля</p>}
                        <Button
                            type="submit"
                            variant="default"
                            size="btn_modal_desktop"
                            disabled={formError}
                            className="bg-gradient-desktop sm_xl:text-3xl sm_l:text-2xl sm_s:text-xl hover:bg-gradient-desktop-hover sm_l:w-4/5 sm_s:w-4/5 mx-auto mt-6 w-[70%] rounded-[50px] text-4xl font-medium sm:w-4/5 sm:text-xl md:text-4xl"
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className="text14px_mobi mb-6 mt-5 flex justify-center">
                        <p className="mr-2 font-medium text-[#878797]">Уже зарегистрированы?</p>
                        <button
                            className="border-transparent bg-transparent font-medium text-white underline"
                            onClick={openLoginModal}
                        >
                            Войти в аккаунт
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationModalMobi
