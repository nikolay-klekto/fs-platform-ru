'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { UncheckedBoxFormDesktop } from '@/components/assets/icons'
import { CheckedBoxFormDesktop } from '@/components/assets/icons'
import PhoneInputDesktop from '../../shared/formInput/PhoneInputDesktop'
import EmailInputDesktop from '../../shared/formInput/EmailInputDesktop'
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

    const handleChange = (field: keyof RegistrationFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Валидацию добавить CЮДА!!!!
        // if (formData.password !== formData.confirmPassword) {
        //     alert('Пароли не совпадают');
        //     return;
        // }

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
                            inputERRAddStyle="border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797]"
                            // externalError={errors.email}
                        />
                    </div>
                    <div className="mb-5">
                        <PhoneInputDesktop
                            value={formData.phone}
                            onChange={(value) => handleChange('phone', value)}
                            labelClassName="label-form-desktop-custom"
                            inputClassName="input-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797]"
                            // externalError={errors.phone}
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
                            inputERRAddStyle="border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797]"
                            showGenerateButton={true}
                            // externalError={errors.password}
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
                            inputERRAddStyle="border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797]"
                            // externalError={errors.confirmPassword}
                        />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            id="subscribe"
                            type="checkbox"
                            checked={formData.subscribe}
                            onChange={(e) => handleChange('subscribe', e.target.checked)}
                            className="hidden peer"
                        />
                        <div
                            className="cursor-pointer flex items-center justify-center rounded transition-all"
                            onClick={() => handleChange('subscribe', !formData.subscribe)}
                        >
                            {formData.subscribe ? (
                                <CheckedBoxFormDesktop className="w-[20px]" />
                            ) : (
                                <UncheckedBoxFormDesktop className="w-[18px]" />
                            )}
                        </div>
                        <label
                            htmlFor="subscribe"
                            className={`font-medium text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base ${
                                formData.subscribe ? 'text-white' : 'text-[#878797]'
                            }`}
                        >
                            Подписаться на рассылку
                        </label>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            id="agree"
                            type="checkbox"
                            checked={formData.agree}
                            onChange={(e) => handleChange('agree', e.target.checked)}
                            className="hidden peer"
                        />
                        <div
                            className="cursor-pointer flex items-center justify-center rounded transition-all"
                            onClick={() => handleChange('agree', !formData.agree)}
                        >
                            {formData.agree ? (
                                <CheckedBoxFormDesktop className="w-[20px]" />
                            ) : (
                                <UncheckedBoxFormDesktop className="w-[18px]" />
                            )}
                        </div>
                        <label
                            htmlFor="agree"
                            className={`font-medium text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base ${
                                formData.agree ? 'text-white' : 'text-[#878797]'
                            }`}
                        >
                            Согласен с условиями использования
                        </label>
                    </div>
                    <div className="w-[95%]">
                        <p className="text-[#353652] font-medium text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base">
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
                        className="mx-auto bg-gradient-desktop text-5xl 4xl:text-3xl 3xl:text-2xl 2xl:text-lg font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[64%]"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className="mt-5 flex justify-center text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base">
                    <p className="mr-2 text-[#878797] font-medium">Уже зарегистрированы??</p>
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
