'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import PasswordInputDesktop from '@/components/desktop/shared/formInput/PasswordInputDesktop'
import { useModal } from '@/context/ContextModal'
import { useLogin } from '@/hooks/useLogin'

export const LoginModalDesktop = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const { login, error: apiError, loading } = useLogin()
    const { openModal } = useModal()

    const validateForm = () => {
        const errors = {
            email: validateEmailDesktop(formData.email).textError || '',
            password: formData.password ? '' : 'Пароль обязателен',
        }
        setFormErrors(errors)
        return !Object.values(errors).some(Boolean)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        await login(formData.email, formData.password)
    }

    const handleChange = (field: 'email' | 'password', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: '' }))
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
                            placeholder="Почта"
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            validate={validateEmailDesktop}
                            className={`${
                                formErrors.email ? 'border-[#bc8070]' : 'border-[#878797]'
                            } h-10 w-full rounded-[20px] border-2 bg-transparent p-3 text-xl font-medium text-white`}
                            label="Почта"
                            labelClassName="mb-1 text-2xl font-medium text-white"
                            wrapperClassName="w-full"
                        />
                        {formErrors.email && <p className="text-red-500 mt-1 text-sm">{formErrors.email}</p>}
                    </div>

                    <div className="relative mb-5">
                        <PasswordInputDesktop
                            value={formData.password}
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={(value) => handleChange('password', value)}
                            onError={(error) => setFormErrors((prev) => ({ ...prev, password: error || '' }))}
                            labelClassName="text-2xl mb-1 font-medium text-white"
                            inputClassName={`${
                                formErrors.password ? 'border-[#bc8070]' : 'border-[#878797]'
                            } h-10 w-full rounded-[20px] border-2 bg-transparent p-3 text-xl font-medium text-white`}
                            errorClassName="text-red-500 mt-1 text-sm"
                            required={true}
                        />
                        {formErrors.password && <p className="text-red-500 mt-1 text-sm">{formErrors.password}</p>}
                    </div>

                    <div className="flex w-full justify-between mb-4">
                        {apiError && <p className="text-red-500">{apiError}</p>}
                        <button
                            type="button"
                            className="text-sm font-semibold text-[#878797] hover:text-white"
                            onClick={openForgotPasswordModal}
                        >
                            Забыли пароль?
                        </button>
                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        disabled={loading}
                        className="mx-auto mt-6 h-16 w-64 rounded-[50px] bg-gradient-to-r from-blue-500 to-purple-600 text-xl font-semibold hover:from-blue-600 hover:to-purple-700"
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </Button>
                </form>

                <div className="mt-5 flex justify-center text-sm">
                    <p className="mr-2 text-[#878797]">Нет аккаунта?</p>
                    <button className="font-medium text-white underline" onClick={openRegistrationModal}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModalDesktop
