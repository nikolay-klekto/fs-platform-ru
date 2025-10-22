'use client'
import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { EnhancedInput } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import { Button } from '@/components/ui/button'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import Link from 'next/link'

interface IFormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

interface IFormErrors {
    name: boolean
    phone: boolean
    time: boolean
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalCallMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')
    const [formError, setFormError] = useState('')
    const [formErrors, setFormErrors] = useState<IFormErrors>({
        name: false,
        phone: false,
        time: false,
        consent: false,
    })

    const phoneMask = '+375 (__) ___-__-__'

    const [isSubmit, setIsSubmit] = useState(false)

    const hasErrors = Object.values(formErrors).some(Boolean)

    const isDisabled = isSubmit && hasErrors

    const getFormError = useCallback(
        (errors: IFormErrors): string => {
            if (
                errors.name ||
                formData.phone.trim() === '' ||
                formData.phone.trim() === '' ||
                formData.phone === phoneMask ||
                formData.time.trim() === '' ||
                errors.consent
            ) {
                return '*Заполните обязательные поля'
            }

            if (errors.phone) return 'Номер телефона введен неверно'
            if (errors.time) return 'Неверный формат времени (ЧЧ.ММ)'

            return ''
        },
        [formData],
    )
    const getFieldsErrors = useCallback((): IFormErrors => {
        const errors = {
            name: formData.name.trim() === '',
            phone:
                (!validatePhoneMobi(formData.phone).status &&
                    (formData.phone.trim() !== '' || formData.phone !== phoneMask)) ||
                formData.phone.trim() === '' ||
                formData.phone === phoneMask,
            time: formData.time.trim() === '' || !/^\d{2}\.\d{2}$/.test(formData.time),
            consent: !formData.consent,
        }

        return errors
    }, [formData])

    const validateForm = (): string => {
        const errorsFromForm = getFieldsErrors()
        const errorMessage = getFormError(errorsFromForm)
        setFormError(errorMessage)

        return errorMessage
    }

    // const normalizePhone = (value: string) => {
    //     return value.replace(/[^\d+]/g, '')
    // }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmit(true)
        if (validateForm() !== '') return

        //const cleanedPhone = normalizePhone(formData.phone)
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: name !== 'consent' ? value : value === 'true',
        }))
    }

    useEffect(() => {
        if (isSubmit) {
            const errorsFromForm = getFieldsErrors()
            setFormErrors(errorsFromForm)
            const errorMessage = getFormError(errorsFromForm)
            setFormError(errorMessage)
        }
    }, [formData, isSubmit, getFormError, getFieldsErrors])

    return (
        <>
            {step === 'form' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} className="z-[70]">
                    <p className="bg-sub-title-gradient-mobi bg-clip-text pb-5 text-center text-4xl font-semibold uppercase text-transparent">
                        Заказать звонок
                    </p>
                    <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <EnhancedInput
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                value={formData.name}
                                onChange={(value: string) => {
                                    handleChange({
                                        target: { name: 'name', value },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }}
                                className={`border-2 ${formErrors.name ? 'border-[#bc8070] !bg-[#1F203F] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'}
                                input-form-mobi-custom sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] h-11 w-full rounded-[50px] bg-transparent pl-[20px] text-xl font-medium text-white placeholder:font-medium placeholder:text-[#353652]`}
                                label="Ваше имя*"
                                labelClassName="text-white text-xl font-medium"
                                wrapperClassName="w-full"
                            />
                        </div>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <div className="flex w-full flex-col gap-1.5">
                                <label htmlFor="phone" className="mb-1 text-xl font-medium text-white">
                                    Номер телефона*
                                </label>
                                <PhoneInputMobi
                                    value={formData.phone}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'phone', value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    onError={() =>
                                        setFormErrors((prev) => ({
                                            ...prev,
                                            phone: false,
                                        }))
                                    }
                                    showInternalError={true}
                                    className={`${formErrors.phone ? 'border-[#bc8070] !bg-[#1F203F] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'} sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] h-11 border-2 pl-[20px] text-xl focus:border-2`}
                                    labelClassName="hidden"
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>

                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <EnhancedInput
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Удобное время для звонка"
                                value={formData.time}
                                onChange={(value: string) => {
                                    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
                                    handleChange({
                                        target: { name: 'time', value },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }}
                                className={`${formErrors.time ? 'border-[#bc8070] !bg-[#1F203F] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'} input-form-mobi-custom sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] h-11 w-full rounded-[50px] border-2 bg-transparent pl-[20px] text-xl font-medium text-white placeholder:font-medium placeholder:text-[#353652]`}
                                label="Удобное время для звонка"
                                labelClassName="text-white text-xl"
                                wrapperClassName="w-full"
                            />
                        </div>
                        <div className="flex gap-[10px]">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value: string) =>
                                    handleChange({
                                        target: { name: 'consent', value },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                label=" "
                                wrapperClassName="flex items-center"
                                checkboxIconSize="size-4"
                                error={formErrors.consent}
                            />
                            <div className="text-xs font-medium text-[#878797]">
                                Я согласен(а) на{' '}
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-1 underline-offset-2"
                                    href="/privacy-policy"
                                >
                                    обработку персональных данных
                                </Link>
                            </div>
                        </div>
                        <div className="h-[30px]">
                            {formError && (
                                <p className="ml-[30px] mt-1 text-xs font-medium leading-[18px] text-[#bc8070]">
                                    {formError}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isDisabled}
                            variant={'call_mobi'}
                            size={'call_mobi'}
                            className={`${isDisabled && 'cursor-not-allowed bg-[#878797] opacity-100'}`}
                        >
                            Отправить заявку
                        </Button>
                    </form>
                </Modal>
            )}

            {step === 'accepted' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} bgClass="bg-auto" className="z-[70]">
                    <h2 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold uppercase text-transparent">
                        Заявка принята
                    </h2>
                    <p className="mb-1 px-3 pb-[18px] text-justify text-xl font-medium leading-[17px] text-[#878797]">
                        Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на сайте.
                    </p>
                    <div className="bg-sub-title-gradient-mobi mx-auto my-2 flex w-[180px] items-center justify-center rounded-[50px] p-[3px]">
                        <Link
                            href="/professions"
                            onClick={onClose}
                            className="flex h-10 w-full items-center justify-center rounded-[50px] bg-[#101030] text-3xl font-semibold text-white"
                        >
                            Смотреть
                        </Link>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ModalCallMobi
