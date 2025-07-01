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
                <button onClick={onClose} className="absolute right-[19px] top-[15px]">
                    <X size={41} color="#FFFFFFCC" className="opacity-80 hover:opacity-100" />
                </button>
                <div className="mx-12 flex-col rounded-lg text-center">
                    <h4 className="mb-[14px] mt-[25px] bg-gradient-desktop bg-clip-text text-9xl font-medium leading-[100%] text-transparent uppercase">
                        Когда профессия станет доступна, куда вам сообщить?
                    </h4>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col px-20">
                    <div className="mb-[26px]">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            label="Почта"
                            labelClassName="text-white text-2xl pl-[6.52px]"
                            variant="gradient_desktop"
                            className={`text18px_desktop h-[50px] w-full rounded-[50px] border-2 border-[#878797] bg-transparent pl-[18.65px] font-medium text-white placeholder:text-4xl focus:outline-none focus:ring-0 ${
                                formError && !formData.email ? 'border-[#BC8070] ring-0' : ''
                            }`}
                        />
                    </div>
                    {formError && (
                        <p className="mb-[14px] ml-[7px] text-[15px] text-[#BC8070] ">Заполните обязательные поля</p>
                    )}
                    <div className="flex flex-col items-start gap-[20px] ">
                        <div className="relative">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value) => handleChange('consent', value === 'true')}
                                label="Я согласен(а) на обработку персональных данных"
                                labelClassName="text-[15px] text-[#878797] pl-[6.52px]"
                                checkboxIconSize="w-[18px]"
                                className="relative"
                            />
                            {formError && !formData.consent && (
                                <span className="pointer-events-none absolute left-1.5 top-0.5 size-[18px] rounded-[2px] border-[2px] border-[#BC8070]" />
                            )}
                        </div>
                        <p className="ml-[7px] flex w-[412px] flex-wrap justify-start text-[15px] font-medium leading-[100%] text-[#353652] ">
                            <p className="w-[234px]">Защита от спама reCAPTCHA</p>
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="ml-[3px] underline ">
                                Конфиденциальность
                            </Link>
                            <p>и</p>
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="ml-[11px] underline">
                                Условия использования
                            </Link>
                        </p>
                    </div>
                    <div className="mb-[25.65px] mt-[16px] flex justify-center">
                        <Button
                            type="submit"
                            variant="default"
                            disabled={formError}
                            className={`h-[52.35px] w-[220px] rounded-full text-3xl font-semibold leading-[100%] ${
                                formError
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
