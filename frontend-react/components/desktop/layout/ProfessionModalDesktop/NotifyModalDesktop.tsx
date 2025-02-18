'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'

interface NotifyFormData {
    email: string
    consent: boolean
}

interface NotifyModalDesktopProps {
    isOpen: boolean
    onClose: () => void
}

const NotifyModalDesktop: React.FC<NotifyModalDesktopProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<NotifyFormData>({
        email: '',
        consent: false,
    })

    const [inputErrors, setInputErrors] = useState<{ email: string | null }>({
        email: null,
    })

    const [formError, setFormError] = useState(false)

    const validateForm = useCallback((): boolean => {
        const hasEmptyFields = !formData.email || !formData.consent
        const hasInternalErrors = inputErrors.email !== null && inputErrors.email !== ''

        return hasEmptyFields || hasInternalErrors
    }, [formData, inputErrors])

    const handleChange = (field: keyof NotifyFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        // Дополнительная валидация email
        if (field === 'email' && typeof value === 'string') {
            const { status, textError } = validateEmailDesktop(value)
            setInputErrors((prev) => ({
                ...prev,
                email: status ? null : textError,
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
        } else {
            console.log('Форма уведомления отправлена:', formData)
            onClose()
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, inputErrors, validateForm])

    if (!isOpen) return null // Не рендерим, если модалка закрыта

    return (
        <Modal show={isOpen} onClose={onClose} size="semilarge" showCloseButton={false}>
            <div className="mx-auto flex w-[73%] flex-col items-center justify-center pb-[30px] pt-[40px]">
                <button
                    onClick={onClose}
                    className="absolute right-[5%] top-[5%] w-[7%] hover:opacity-100 transition-opacity duration-300"
                >
                    <X size={41} color="white" className="w-full opacity-70 hover:opacity-100" />
                </button>
                <h2
                    className="text28px_desktop text-gradient_desktop_custom mb-7 block font-medium uppercase text-center w-[543px] leading-[1.22] break-normal whitespace-normal"
                    style={{ textWrap: 'balance' }}
                >
                    Когда профессия станет доступна, куда вам сообщить?
                </h2>
                <form onSubmit={handleSubmit} className="flex w-full flex-col align-middle">
                    <div className="mb-5">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            value={formData.email}
                            validate={validateEmailDesktop}
                            onChange={(value) => handleChange('email', value)}
                            variant="gradient_desktop"
                            className="h-10 w-full rounded-[20px] border-[2px] border-[#878797] bg-transparent p-3 text-xl font-medium text-white focus:outline-none focus:ring-0"
                        />
                        {inputErrors.email && <p className="error-form-desktop-custom">{inputErrors.email}</p>}
                    </div>
                    <div className="py-2 flex items-center h-[40px]">
                        <EnhancedInput
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={(value) => handleChange('consent', value === true)}
                            label="Я согласен(а) на обработку персональных данных"
                            wrapperClassName="flex gap-2 pt-2"
                        />
                    </div>
                    <p className="text15px_desktop mt-3 font-medium text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                            Конфиденциальность
                        </Link>{' '}
                        и{' '}
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                            Условия использования
                        </Link>
                    </p>
                    {formError && <p className="error-form-desktop-custom">Заполните необходимые поля</p>}
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] mx-auto mt-6 w-[220px] h-[52.35px] rounded-[40.44px] text-lg font-semibold transition-all duration-300 via-[#5F4AF3] hover:shadow-lg hover:bg-gradient-desktop-hover"
                    >
                        Отправить
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default NotifyModalDesktop
