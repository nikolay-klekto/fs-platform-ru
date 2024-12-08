'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import PhoneInputDesktop from '../../shared/formInput/PhoneInputDesktop'
import EmailInputDesktop from '../../shared/formInput/EmailInputDesktop'
import PasswordInputDesktop from '../../shared/formInput/PasswordInputDesktop'
import CheckBoxInputDesktop from '../../shared/formInput/CheckBoxInputDesktop'

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

    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: '',
        agree: '',
    })

    const handleChange = (field: keyof RegistrationFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        if (field === 'confirmPassword' && typeof value === 'string' && formData.password) {
            const minLength = Math.min(value.length, formData.password.length)

            for (let i = 0; i < minLength; i++) {
                if (value[i] !== formData.password[i]) {
                    setErrors((prev) => ({
                        ...prev,
                        confirmPassword: 'Пароли не совпадают',
                    }))
                    return
                }
            }

            if (value.length === formData.password.length) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: '',
                }))
            } else if (value.length < formData.password.length) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: '',
                }))
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Данные формы:', formData)
        closeModal()
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
                        <EmailInputDesktop
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            inputClassName="input-form-desktop-custom"
                            labelClassName="label-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            externalError={errors.email}
                            required={true}
                        />
                    </div>
                    <div className="mb-5">
                        <PhoneInputDesktop
                            value={formData.phone}
                            onChange={(value) => handleChange('phone', value)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            externalError={errors.phone}
                            required={true}
                        />
                    </div>
                    <div className="mb-5 relative">
                        <PasswordInputDesktop
                            value={formData.password}
                            label="Пароль"
                            placeholder="Пароль"
                            onChange={(value) => handleChange('password', value)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            showGenerateButton={true}
                            externalError={errors.password}
                            required={true}
                        />
                    </div>
                    <div className="mb-7 4xl:mb-6 3xl:mb-5 2xl:mb-4">
                        <PasswordInputDesktop
                            value={formData.confirmPassword}
                            label="Повторите пароль"
                            placeholder="Повторите пароль"
                            onChange={(value) => handleChange('confirmPassword', value)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            externalError={errors.confirmPassword}
                            required={true}
                        />
                        {errors.confirmPassword && (
                            <p className=" error-form-desktop-custom">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <CheckBoxInputDesktop
                            id="subscribe"
                            checked={formData.subscribe}
                            onChange={(checked) => handleChange('subscribe', checked)}
                            label="Подписаться на рассылку"
                        />
                    </div>
                    <div className="mb-3">
                        <CheckBoxInputDesktop
                            id="agree"
                            checked={formData.agree}
                            onChange={(checked) => handleChange('agree', checked)}
                            label="Согласен с условиями использования"
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
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        className="mx-auto bg-gradient-desktop text20px_desktop font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover disabled:bg-[#878797] w-[64%]"
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
