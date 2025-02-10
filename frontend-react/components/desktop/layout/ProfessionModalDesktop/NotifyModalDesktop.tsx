'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { useModal } from '@/context/ContextModal'

interface NotifyFormData {
    email: string
    consent: boolean
}

const NotifyModalDesktop: React.FC = () => {
    const { isOpen, closeModal } = useModal() 
    const [formData, setFormData] = useState<NotifyFormData>({
        email: '',
        consent: false,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [inputErrors] = useState<{ [key: string]: string | null }>({
        email: '',
    })

    const [formError, setFormError] = useState(false)

    const validateForm = useCallback((): boolean => {
        const hasEmptyFields = !formData.email || !formData.consent
        const hasInternalErrors = Object.values(inputErrors).some((error) => error !== null && error !== '')

        return hasEmptyFields || hasInternalErrors
    }, [formData, inputErrors])

    const handleChange = (field: keyof NotifyFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setFormError(true)
        } else {
            console.log('Форма уведомления отправлена:', formData)
            closeModal()
        }
    }

    useEffect(() => {
        if (!validateForm()) {
            setFormError(false)
        }
    }, [formData, inputErrors, validateForm])

    return (
        <Modal show={isOpen} onClose={closeModal} size="semilarge" showCloseButton={false}>
            <div className="mx-auto flex w-[73%] flex-col items-center justify-center pb-[30px] pt-[40px]">
                <button onClick={closeModal} className="absolute right-[5%] top-[5%] w-[7%]">
                    <X size={41} color="white" className="w-full opacity-70" />
                </button>
                <h2 className="text28px_desktop text-gradient_desktop_custom mb-7 inline font-medium uppercase text-center">
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
                            className="h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white"                      />
                        {inputErrors.email && <p className="error-form-desktop-custom">{inputErrors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <EnhancedInput
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={(value) => handleChange('consent', value === 'true')}
                            label="Я согласен(а) на обработку персональных данных"
                            wrapperClassName="flex gap-2 pb-2"
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
                    <Button type="submit" className="bg-gradient-desktop mx-auto mt-6 w-[220px]  h-[52.35px] rounded-[40.44px] text-16.18px font-semibold">
                        Отправить
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default NotifyModalDesktop
