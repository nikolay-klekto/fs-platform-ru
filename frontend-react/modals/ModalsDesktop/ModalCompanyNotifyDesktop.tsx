'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'

interface INotifyFormData {
    email: string
    consent: boolean
}

interface INotifyModal {
    onClose: () => void
}

const ModalCompanyNotifyDesktop: React.FC<INotifyModal> = ({ onClose }) => {
    const [formData, setFormData] = useState<INotifyFormData>({
        email: '',
        consent: false,
    })

    const [inputErrors, setInputErrors] = useState<{ email: string | null }>({
        email: null,
    })

    const [formError, setFormError] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validateForm = useCallback((): boolean => {
        const hasEmptyFields = !formData.email || !formData.consent
        const hasInternalErrors = inputErrors.email !== null && inputErrors.email !== ''

        return hasEmptyFields || hasInternalErrors
    }, [formData, inputErrors])

    const handleChange = (field: keyof INotifyFormData, value: string | boolean) => {
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

        if (field === 'consent' && value === true) {
            setCheckboxChecked(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)

        const emailValidation = validateEmailDesktop(formData.email)
        if (!emailValidation.status) {
            setInputErrors((prev) => ({
                ...prev,
                email: emailValidation.textError,
            }))
        }

        if (validateForm()) {
            setFormError(true)
            if (!formData.consent) {
                setCheckboxChecked(true)
            }
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

    const emailInvalid = inputErrors.email !== null || formData.email.trim() === ''
    const isButtonDisabled = isSubmitted && (emailInvalid || !formData.consent)
    const showEmailError = isSubmitted && emailInvalid

    return (
        <Modal onClose={onClose} size="semilarge" showCloseButton={false}>
            <div className="mx-auto flex w-[73%] flex-col items-center justify-center pb-[30px] pt-[40px]">
                <button
                    onClick={onClose}
                    className="absolute right-[5%] top-[5%] w-[7%] transition-opacity duration-300 hover:opacity-100"
                >
                    <X size={41} color="white" className="w-full opacity-70 hover:opacity-100" />
                </button>
                <h2
                    className="text28px_desktop text-gradient_desktop_custom block w-[543px] whitespace-normal break-normal text-center font-medium uppercase leading-[1.22]"
                    style={{ textWrap: 'balance' }}
                >
                    Когда компания станет доступна, куда вам сообщить?
                </h2>
                <form onSubmit={handleSubmit} className="flex w-full flex-col align-middle">
                    <div className="mb-5">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            label="Почта"
                            value={formData.email}
                            validate={validateEmailDesktop}
                            onChange={(value) => handleChange('email', value)}
                            variant="gradient_desktop"
                            labelClassName="text-white text-[15px] ml-[11.52px] mt-[14px] mb-[3px]"
                            className={`h-[50px] w-full rounded-[50px] border-2 bg-transparent p-3 text-[18px] font-medium text-white focus:outline-none focus:ring-0"
                            ${showEmailError ? 'border-[#E99B9B]' : 'border-[#878797]'}
                            `}
                        />
                        {formError}
                    </div>
                    <div className="relative flex h-[40px] items-center">
                        <div className="relative">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value) => handleChange('consent', value === 'true')}
                                label="Я согласен(а) на обработку персональных данных"
                                wrapperClassName="flex gap-2 pt-[6]"
                                className="size-[16px] rounded-sm border-white"
                            />
                            {checkboxChecked && (
                                <span className="pointer-events-none absolute left-0 top-[0.99px] size-[16px] rounded-sm border-[3px] border-[#E99B9B]" />
                            )}
                        </div>
                    </div>
                    <p className="text15px_desktop font-medium text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                            Конфиденциальность
                        </Link>{' '}
                    </p>
                    <p className="text15px_desktop font-medium text-[#353652]">
                        {' '}
                        и{' '}
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                            Условия использования
                        </Link>
                    </p>
                    <Button
                        type="submit"
                        disabled={isButtonDisabled}
                        className={
                            isButtonDisabled
                                ? 'mx-auto mt-6 h-[52.35px] w-[220px] rounded-[40.44px] font-semibold text-white pointer-events-none cursor-not-allowed bg-[#878797] text-[16px] !opacity-100'
                                : 'hover:bg-gradient-desktop-hover mx-auto mt-6 h-[52.35px] w-[220px] rounded-[40.44px] bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] text-[16px] font-semibold transition-all duration-300 hover:shadow-lg'
                        }
                    >
                        Отправить
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default ModalCompanyNotifyDesktop
