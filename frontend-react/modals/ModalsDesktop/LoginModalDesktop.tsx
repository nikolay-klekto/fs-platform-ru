'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import PasswordInputDesktop from '@/components/desktop/shared/formInput/PasswordInputDesktop'
import { useModal } from '@/context/ContextModal'
import { useLogin } from '@/hooks/useLogin'
import { useRouter } from 'next/navigation'

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
    const [formError, setFormError] = useState({
        show: false,
        message: '',
    })
    const { login, error: apiError, loading } = useLogin()
    const router = useRouter()

    const validateForm = useCallback((): boolean => {
        const emailEmpty = formData.email.trim() === ''
        const passwordEmpty = formData.password.trim() === ''

        if (emailEmpty || passwordEmpty) {
            setFormError({
                show: true,
                message: 'Введите e-mail и пароль',
            })
            return true
        }
        return false
    }, [formData.email, formData.password])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) return

        const result = await login(formData.email, formData.password)

        if (result.success) {
            onClose()
            router.push('/profile')
        } else {
            setFormError({
                show: true,
                message: 'Аккаунт не найден, проверьте вводимые данные',
            })
        }
    }

    const openRegistrationModal = () => {
        onClose()
        openModal('registration_desktop', 'desktop')
    }

    const openForgotPasswordModal = () => {
        onClose()
        openModal('forgot_password_desktop', 'desktop')
    }

    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div className="mx-auto flex w-[73%] flex-col items-center justify-center pb-[30px] pt-[40px]">
                <button onClick={onClose} className="absolute right-[5%] top-[5%] w-[7%]">
                    <X size={41} color="#878797" className="w-full opacity-50 hover:opacity-100" />
                </button>

                <h2 className="text36px_desktop text-gradient_desktop_custom mb-7 inline font-medium uppercase">
                    Вход
                </h2>

                <form onSubmit={handleSubmit} className="flex w-full flex-col align-middle">
                    <div className="mb-5">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            variant={'common_input_desktop'}
                            size={'common_input_desktop'}
                            rounded={'rounded_50'}
                            value={formData.email}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, email: value }))
                                if (validateEmailDesktop(value)) {
                                    setFormError((prev) => ({ ...prev, show: false }))
                                }
                            }}
                            onBlur={() => {
                                if (formData.email === '') {
                                    setFormError((prev) => ({ ...prev, show: true }))
                                }
                            }}
                            validate={validateEmailDesktop}
                            className={` ${
                                formError.show && (formData.email === '' || !validateEmailDesktop(formData.email))
                                    ? 'border-[#bc8070] focus:border-[#bc8070]'
                                    : 'border-[#878797] focus:border-[#878797]'
                            } `}
                            label="Почта"
                            labelClassName="mb-1 text-2xl font-medium text-white"
                            wrapperClassName="w-full"
                        />
                    </div>

                    <div className="relative mb-5">
                        <PasswordInputDesktop
                            value={formData.password}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, password: value }))
                                setFormError((prev) => ({ ...prev, show: false }))
                            }}
                            onError={() => {}}
                            label="Пароль"
                            placeholder="Пароль"
                            labelClassName="label-form-desktop-custom text-2xl mb-1"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="hidden"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            required={true}
                            formError={formError.show && formData.password === ''}
                        />
                    </div>

                    <div className={`flex w-full ${formError.show || apiError ? 'justify-between' : 'justify-end'}`}>
                        {formError.show && !apiError && (
                            <p className="error-form-desktop-custom">{formError.message}</p>
                        )}
                        {apiError && (
                            <p className="error-form-desktop-custom">Аккаунт не найден, проверьте вводимые данные</p>
                        )}
                        <button
                            type="button"
                            className="text15px_desktop bg-transparent font-semibold text-[#878797]"
                            onClick={openForgotPasswordModal}
                        >
                            Забыли пароль?
                        </button>
                    </div>

                    <div className="w-[95%]">
                        <p className="text15px_desktop mt-3 font-medium text-[#353652]">
                            Защита от спама reCAPTCHA{' '}
                            <Link
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
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
                        disabled={loading || (formError.show && !apiError)}
                        className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-6 h-[64px] w-[64%] rounded-[50px] text-5xl font-semibold disabled:cursor-not-allowed disabled:bg-[#878789] disabled:bg-none disabled:text-[#CBD6EF] disabled:opacity-100 disabled:hover:bg-none"
                    >
                        {loading ? 'Вход...' : 'Войти'}
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
