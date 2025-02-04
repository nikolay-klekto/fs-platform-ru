'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import PasswordInputMobi from '@/components/mobi/shared/formInput/PasswordInputMobi'
import { useModal } from '@/context/ContextModal'

interface LoginFormData {
    email: string
    password: string
}

interface ModalCallMobiProps {
    isOpen: boolean
    onClose: () => void
}
const LoginModalDesktop: React.FC<ModalCallMobiProps> = ({ isOpen, onClose }) => {
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative max-w-md w-full">
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 rounded-[50px] bg-[#101030] bg-opacity-80"
                >
                    <X size={30} color="#878797" />
                </button>
                <div className="relative rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')]  bg-[right_top] bg-cover bg-no-repeat flex flex-col items-center max-w-[500px]">
                    <h1 className="text18px_mobi font-semibold bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-1 mx-auto uppercase inline">
                        Вход
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col align-middle w-[80%]">
                        <div className="mb-2">
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
                        <div className="mb-2 relative">
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
                                required={true}
                            />
                        </div>
                        <button className="underline bg-transparent border-transparent self-end text-[#878797] font-semibold text14px_mobi">
                            Забыли пароль?
                        </button>
                        {formError && <p className="error-form-mobi-custom">Заполните необходимые поля</p>}
                        <Button
                            type="submit"
                            variant="default"
                            size="btn_modal_desktop"
                            disabled={formError}
                            className="mx-auto bg-gradient-desktop text-4xl md:text-4xl sm_xl:text-3xl sm_l:text-2xl sm_s:text-xl sm:text-xl font-medium rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[80%]"
                        >
                            Войти
                        </Button>
                    </form>
                    <div className="mt-5 mb-6 flex justify-center text14px_mobi">
                        <p className="mr-2 text-[#878797] font-medium">Нет аккаунта?</p>
                        <button
                            className="underline bg-transparent border-transparent text-white font-medium"
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
