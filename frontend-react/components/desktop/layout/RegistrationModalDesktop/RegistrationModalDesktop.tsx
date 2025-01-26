import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'
import PasswordInputDesktop from '../../shared/formInput/PasswordInputDesktop'

interface RegistrationFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
    subscribe: boolean
    agree: boolean
}

interface RegistrationModalDesktopProps {
    closeModal: () => void
    openLoginModal: () => void
}

const RegistrationModalDesktop: React.FC<RegistrationModalDesktopProps> = ({ closeModal, openLoginModal }) => {
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

    const [inputTouched, setInputTouched] = useState({
        email: false,
        phone: false,
    })

    const handleInputBlur = (field) => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div className="flex flex-col justify-center items-center pt-[40px] pb-[30px] w-[73%] mx-auto">
                <button onClick={closeModal} className="absolute top-[5%] right-[5%] w-[7%]">
                    <X size={41} color="white" className="opacity-70 w-full" />
                </button>
                <h2 className="mb-7 4xl:mb-6 3xl:mb-5 2xl:mb-4 text36px_desktop font-medium text-gradient_desktop_custom uppercase inline">
                    Регистрация
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
                    <div className="mb-5">
                        <EnhancedInput
                            type="tel"
                            name="phone"
                            placeholder="Номер телефона"
                            value={formData.phone}
                            onBlur={() => handleInputBlur('phone')}
                            validate={(value) => validatePhoneDesktop(value)}
                            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                            className={`${
                                inputTouched.phone && validatePhoneDesktop(formData.phone).styleError
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
                    <div className="mb-7">
                        <PasswordInputDesktop
                            value={formData.confirmPassword}
                            label="Повторите пароль"
                            placeholder="Повторите пароль"
                            onChange={(value) => handleChange('confirmPassword', value)}
                            onError={(error) => handleError('confirmPassword', error)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            required={true}
                        />
                        {errors.confirmPassword && (
                            <p className="error-form-desktop-custom">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <EnhancedInput
                            type="checkbox"
                            name="subscribe"
                            checked={formData.subscribe}
                            onChange={(value) => setFormData((prev) => ({ ...prev, subscribe: value }))}
                            label="Я согласен(а) на получение рассылки"
                            wrapperClassName="flex gap-2 pb-2"
                            labelClassName={`${formData.subscribe ? 'text-white' : 'text-[#878797]'}`}
                        />
                    </div>
                    <div className="mb-3">
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
                            onChange={(value) => setFormData((prev) => ({ ...prev, agree: value }))}
                            label="Я согласен(а) на обработку персональных данных"
                            wrapperClassName="flex gap-2 pb-2"
                            labelClassName={`${formData.agree ? 'text-white' : 'text-[#878797]'}`}
                        />
                        {errors.agree && <p className="error-form-desktop-custom">{errors.agree}</p>}
                    </div>
                    <div className="w-[95%]">
                        <p className="text-[#353652] font-medium text15px_desktop">
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
                        className="mx-auto bg-gradient-desktop text-5xl font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover disabled:bg-[#878797] w-[70%]"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className="mt-5 flex justify-center text15px_desktop">
                    <p className="mr-2 text-[#878797] font-medium">Уже зарегистрированы?</p>
                    <button
                        className="underline bg-transparent border-transparent text-white font-medium"
                        onClick={openLoginModal}
                    >
                        Войти в аккаунт
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default RegistrationModalDesktop
