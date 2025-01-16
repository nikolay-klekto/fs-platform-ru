'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Modal from '@/components/ui/modal';
import Link from 'next/link'
import EmailInputDesktop from '../../shared/formInput/EmailInputDesktop';

interface ResetPasswordFormData {
    email: string
}

interface ResetPasswordModalDesktopProps {
    closeModal: () => void
}

const ResetPasswordModalDesktop: React.FC<ResetPasswordModalDesktopProps> = ({ closeModal }) => {
    const [formData, setFormData] = useState<ResetPasswordFormData> ({
        email: '',
    })

    const [inputInternalErrors, setInputInternalErrors] =useState<{ [key: string]: string | null}>({
        email: '',
    })

    const validateForm = (): boolean => {
        const hasEmptyFields = formData.email === ''

        const hasInternalErrors = Object.values(inputInternalErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasInternalErrors
    }  

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }))
    }

    const [formError, setFormError] = useState(false)

    const handleChange = (field: keyof ResetPasswordFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
            console.log('Ошибка: Неверная почта')
        } else {
            setFormError(false)
            console.log('Форма сброса пароля отправлена:', formData)
            closeModal()
        }
    }

    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div className="flex flex-col justify-center items-center pt-[40px] pb-[30px] w-[73%] mx-auto">
                <button onClick={closeModal} className="absolute top-[5%] right-[5%] w-[7%]">
                    <X size={41} color="white" className="opacity-70 w-full" />
                </button>
                <h2 className="mb-7 4xl:mb-6 3xl:mb-5 2xl:mb-4 text36px_desktop font-medium text-gradient_desktop_custom uppercase inline">
                    Забыли пароль?
                </h2>
                <p className="bg-transparent border-transparent self-start text-[#878797] font-semibold text15px_desktop">
                Чтобы получить доступ к аккаунту, введите e-mail адрес, который вы указали при регистрации  
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col align-middle w-full">
                    <div className="mb-5">
                        <EmailInputDesktop
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            onError={(error) => handleError('email', error)}
                            inputClassName="input-form-desktop-custom"
                            labelClassName="label-form-desktop-custom"
                            errorClassName="error-form-desktop-custom"
                            inputERRAddStyle="border-[#bc8070] focus:border-[#bc8070]"
                            inputNOERRAddStyle="border-[#878797] focus:border-[#878797]"
                            required={true}
                        />
                    </div>
                    <div className="w-[95%]">
                        <p className="mt-3 text-[#353652] font-medium text15px_desktop">
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
                    {formError && <p className="error-form-desktop-custom">Аккаунт не найден, проверьте введенные данные</p>}
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        disabled={formError}
                        className="mx-auto bg-gradient-desktop text-5xl 4xl:text-3xl 3xl:text-2xl 2xl:text-lg font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[64%]"
                    >
                        Далее
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default ResetPasswordModalDesktop;

