'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'

interface IModalProfessionNotifyData {
    email: string
    consent: boolean
}

interface IModalProfessionNotifyContent {
    onClose: () => void
}

const ModalProfessionNotifyDesktop: React.FC<IModalProfessionNotifyContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IModalProfessionNotifyData>({
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

    const handleChange = (field: keyof IModalProfessionNotifyData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

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

    return (
        <Modal onClose={onClose} size="semilarge" showCloseButton={false}>
            <div className="max-w-[701px]">
                <button onClick={onClose} className="absolute right-7 top-6">
                    <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                </button>
                <div className="mx-12 flex-col rounded-lg text-center">
                    <h4 className="mb-[22px] mt-[43px] bg-gradient-desktop bg-clip-text text-9xl font-medium leading-[100%] text-transparent uppercase">
                        Когда профессия станет доступна, куда вам сообщить?
                    </h4>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col px-20">
                    <div className="pb-[22px]">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            value={formData.email}
                            validate={validateEmailDesktop}
                            onChange={(value) => handleChange('email', value)}
                            label="Почта"
                            labelClassName="text-white text-2xl pl-[6.52px]"
                            variant="gradient_desktop"
                            className={`h-10 w-full rounded-[50px] border-2 border-[#878797] bg-transparent pl-[18.65px] text-[18px] font-medium text-white focus:outline-none focus:ring-0 ${
                                formError && (inputErrors.email || (formError && !formData.email))
                                    ? 'border-[#BC8070] ring-0'
                                    : ''
                            }}`}
                        />
                        {inputErrors.email && <p className="error-form-desktop-custom">{inputErrors.email}</p>}
                    </div>
                    <div className="flex flex-col items-start gap-[20px] px-[7px]">
                        <EnhancedInput
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={(value) => handleChange('consent', value === 'true')}
                            label="Я согласен(а) на обработку персональных данных"
                            checkboxIconSize="w-[18px]"
                            className={formError && !formData.consent ? 'border-2 border-[#BC8070]' : ''}
                        />
                        <p className="text15px_desktop font-medium text-[#353652]">
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
                    <div className="my-[19px] flex justify-center">
                        <Button
                            type="submit"
                            variant="default"
                            disabled={formError === true}
                            className={`h-14 max-w-[220px] rounded-full px-16 text-3xl font-semibold leading-[100%] ${
                                formError === true
                                    ? 'bg-[#878797] disabled:opacity-100'
                                    : 'bg-gradient-desktop hover:bg-gradient-desktop-hover'
                            }`}
                        >
                            Отправить
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ModalProfessionNotifyDesktop
