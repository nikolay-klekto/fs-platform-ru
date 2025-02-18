'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import PasswordInputMobi from '@/components/mobi/shared/formInput/PasswordInputMobi'
import { useModal } from '@/context/ContextModal'
import { useAuthActions } from '@/hooks/AuthHook'
interface RegistrationFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
    subscribe: boolean
    agree: boolean
}

interface RegistrationMobiProps {
    isOpen: boolean
}

const RegistrationModalMobi: React.FC<RegistrationMobiProps> = ({ isOpen }) => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
        agree: false,
    })
    const { closeModal, openModal } = useModal()
    const { handleRegister } = useAuthActions()
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
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
            console.log('Ошибка: Заполните все поля корректно или исправьте ошибки')
        } else {
            setFormError(false)
            try {
                await handleRegister({
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                })
                closeModal()
                router.push('/personalaccount')
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message)
                } else {
                    alert('Произошла неизвестная ошибка')
                }
            }
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, errors, inputInternalErrors, validateForm])

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
        closeModal()
        openModal('login_desktop', 'desktop')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative max-w-md w-full">
                <button
                    onClick={closeModal}
                    className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-80"
                >
                    <X size={44} color="#878797" />
                </button>
                <div className="relative flex max-w-[500px] flex-col items-center rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat">
                    <h1 className="text18px_mobi mx-auto mb-1 mt-6 inline bg-sub-title-gradient-mobi bg-clip-text font-semibold uppercase text-transparent">
                        Регистрация
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col align-middle w-[80%]">
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
                                } border rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white`}
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
                                } border rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white`}
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
                                onChange={(value) => setFormData((prev) => ({ ...prev, subscribe: value === 'true' }))}
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
        </div>
    )
}

export default RegistrationModalMobi
