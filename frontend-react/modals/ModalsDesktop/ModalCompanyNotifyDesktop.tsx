'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CrossIconDesktop } from '@/components/assets/iconsDesktop'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { useToast } from '@/hooks/useToast'

interface INotifyFormData {
    email: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalCompanyNotifyDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<INotifyFormData>({
        email: '',
        consent: false,
    })

    const [formErrors, setFormErrors] = useState<{ email: string | null; consent: boolean }>({
        email: null,
        consent: false,
    })

    const [checkboxTouched, setCheckboxTouched] = useState(false)

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const { toast } = useToast()

    const handleChange = (field: keyof INotifyFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        if (field === 'email') {
            setFormErrors((prev) => ({
                ...prev,
                email: null,
            }))
        }

        if (field === 'consent') {
            setCheckboxTouched(true)
            setFormErrors((prev) => ({
                ...prev,
                consent: !value,
            }))
        }
    }

    const validateForm = (checkboxTouched: boolean): boolean | undefined => {
        let hasErrors = false

        if (!formData.email) {
            setFormErrors((prev) => ({
                ...prev,
                email: 'Заполните поля',
            }))

            hasErrors = true
        } else {
            const emailValidation = validateEmailDesktop(formData.email)
            if (!emailValidation.status) {
                setFormErrors((prev) => ({
                    ...prev,
                    email: emailValidation.textError,
                }))

                hasErrors = true
            }
        }

        if (!formData.consent && checkboxTouched) {
            setFormErrors((prev) => ({
                ...prev,
                consent: true,
            }))
            hasErrors = true
        }

        if (hasErrors) {
            setButtonDisabled(true)
            return hasErrors
        }
    }

    const handleEmailBlur = (): void => {
        validateForm(checkboxTouched)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCheckboxTouched(true)

        const hasErrors = validateForm(true)

        if (!hasErrors) {
            onClose()

            toast({
                description: 'Спасибо! Ваша заявка была успешно отправлена',
                duration: 4000,
            })
        }
    }

    useEffect(() => {
        if (!formErrors.email && !formErrors.consent) setButtonDisabled(false)
    }, [formErrors.email, formErrors.consent])

    return (
        <Modal onClose={onClose} size="semilarge-l" showCloseButton={false}>
            <div className="mx-auto flex flex-col items-center justify-center px-[80px] pt-[43px]">
                <button
                    onClick={onClose}
                    className="absolute right-5 top-4 transition-opacity duration-300 hover:opacity-100"
                >
                    <CrossIconDesktop className="opacity-70 hover:opacity-100" />
                </button>
                <h2
                    className="text-gradient_desktop_custom block w-[543px] whitespace-normal break-normal text-center text-[28px] font-medium uppercase leading-[1.22]"
                    style={{ textWrap: 'balance' }}
                >
                    Когда компания станет доступна, куда вам сообщить?
                </h2>
                <form onSubmit={handleSubmit} className="flex w-full flex-col px-[5px] align-middle" noValidate>
                    <div className={formErrors.email || formErrors.consent ? 'mb-2' : 'mb-5'}>
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Ваш e-mail"
                            label="Почта"
                            value={formData.email}
                            validate={validateEmailDesktop}
                            onChange={(value) => handleChange('email', value)}
                            onBlur={handleEmailBlur}
                            variant="gradient_desktop"
                            error={!!formErrors.email}
                            labelClassName="text-white text-[15px] font-medium ml-[6px] mt-[18px] "
                            className={`focus:ring-0" h-[50px] w-[518px] rounded-[50px] border-2 bg-transparent text-[18px] font-medium text-white focus:outline-none
                            ${formErrors.email ? 'border-[#E99B9B]' : 'border-[#878797]'}
                            `}
                        />

                        {(formErrors.email || formErrors.consent) && (
                            <p className="mt-2 text-[15px] text-[#E99B9B]">{formErrors.email ?? 'Заполните поля'}</p>
                        )}
                    </div>
                    <div className="relative mb-4 flex items-center">
                        <div className="relative">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value) => handleChange('consent', value === 'true')}
                                label="Я согласен(а) на обработку персональных данных"
                                labelClassName="text-[15px]"
                                wrapperClassName="flex gap-2"
                                error={formErrors.consent}
                                className="size-[18px] rounded-[2px]"
                            />
                        </div>
                    </div>
                    <div className="mb-6 h-[36px] w-[433px] text-[15px] font-medium text-[#353652]">
                        <div className="flex">
                            <span>Защита от спама reCAPTCHA</span>
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="ml-[5px] underline">
                                Конфиденциальность
                            </Link>
                        </div>
                        <span className="mr-[5px]">и</span>
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                            Условия использования
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="companies_mobi"
                        disabled={buttonDisabled}
                        className={
                            buttonDisabled
                                ? 'pointer-events-none mx-auto mb-8 h-[52.35px] w-[220px] rounded-[40.44px] bg-[#878797] text-[16px] font-semibold text-white !opacity-100'
                                : 'hover:bg-gradient-desktop-hover mx-auto mb-8 h-[52.35px] w-[220px] rounded-[40.44px] bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] text-[16px] font-semibold transition-all duration-300 hover:shadow-lg'
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
