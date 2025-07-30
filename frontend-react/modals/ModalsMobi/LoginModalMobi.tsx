'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import PasswordInputMobi from '@/components/mobi/shared/formInput/PasswordInputMobi'
import { useModal } from '@/context/ContextModal'
import { useLogin } from '@/hooks/useLogin'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile';
import Modal from '@/components/ui/modal'

interface ILoginFormData {
    email: string
    password: string
}

interface IModalContent {
    onClose: () => void
}

const LoginModalMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<ILoginFormData>({
        email: '',
        password: '',
    })
    const isMobile = useIsMobile();
    const { openModal } = useModal()
    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        password: '',
    })
    const { login, error: apiError, loading } = useLogin()
    const router = useRouter()

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
        if (inputInternalErrors[field]) {
            setInputInternalErrors((prev) => ({ ...prev, [field]: null }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
            return
        }

        const result = await login(formData.email, formData.password)

        if (result.success) {
            onClose()
            router.push('/profile')
        } else {
            setInputInternalErrors((prev) => ({
                ...prev,
                email: result.errorMessage || 'Ошибка авторизации',
            }))
            setFormError(true)
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
        openModal('registration_mobi', 'mobi')
    }

    const openForgotPassowrdModal = () => {
        onClose()
        openModal('forgot_password_mobi', 'mobi')
    }

    return (
        <Modal
            onClose={onClose}
            size="medium"
            showCloseButton={false}
            isMobile={isMobile}
            className={"bg-[url('/background/Subtract_modalCall_Login.png')] bg-[center] bg-no-repeat"}
        >
            <div className="relative flex w-[350px] h-[410px] flex-col items-center ">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                >
                    <X size={30} color="#878797" />
                </button>
                <h2 className="text18px_mobi bg-sub-title-gradient-mobi mx-auto mb-1 mt-6 inline bg-clip-text font-semibold uppercase text-transparent">
                    Вход
                </h2>
                <form onSubmit={handleSubmit} className="flex w-4/5 flex-col align-middle">
                    <div className="mb-2">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            variant={'common_input_mobi'}
                            size={'common_input_mobi'}
                            rounded={'rounded_50'}
                            value={formData.email}
                            onBlur={() => handleInputBlur('email')}
                            validate={(value) => validateEmailMobi(value)}
                            onChange={(value) => handleChange('email', value.toLowerCase())}
                            className={`${(inputTouched.email && validateEmailMobi(formData.email).styleError) ||
                                formError ||
                                inputInternalErrors.email
                                ? 'border-[#bc8070] focus:border-[#bc8070] '
                                : 'border-[#878797] focus:border-[#878797]'
                                } `}
                            label="Почта"
                            labelClassName="mb-1 text14px_mobi font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-mobi-custom">{inputInternalErrors.email}</p>
                        )}
                    </div>
                    <div className="relative">
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
                    {(formError || apiError) && (
                        <p className="error-form-mobi-custom">{apiError || 'Заполните необходимые поля'}</p>
                    )}
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError || loading}
                        className="bg-gradient-desktop hover:bg-gradient-desktop-hover sm_s:text-xl sm_l:text-2xl sm_xl:text-3xl mx-auto mt-6 w-4/5 rounded-[50px] text-4xl font-medium sm:text-xl md:text-4xl"
                    >
                        {loading ? 'Вход...' : 'Войти'}
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
        </Modal>
    )
}

export default LoginModalMobi
