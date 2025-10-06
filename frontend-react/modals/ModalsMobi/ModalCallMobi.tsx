'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { EnhancedInput } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
// import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
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
    //const [errors, setErrors] = useState<{ [key: string]: string }>({})
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

    useEffect(() => {
        if (isSubmit) {
            const errorsFromForm = getFieldsErrors()
            setFormErrors(errorsFromForm)
            const errorMessage = getFormError(errorsFromForm)
            setFormError(errorMessage)
        }
    }, [formData, isSubmit])

    const getFormError = (errors: IFormErrors): string => {
        if (
            errors.name ||
            formData.phone.trim() === '' ||
            formData.phone.trim() === '' ||
            formData.phone === phoneMask ||
            errors.time ||
            errors.consent
        ) {
            return '*Заполните обязательные поля'
        }

        if (errors.phone) return 'Номер телефона введен неверно'
        if (errors.time) return 'Некорректное время'

        return ''
    }

    const getFieldsErrors = (): IFormErrors => {
        const errors = {
            name: formData.name.trim() === '',
            phone:
                (!validatePhoneMobi(formData.phone).status &&
                    (formData.phone.trim() !== '' || formData.phone !== phoneMask)) ||
                formData.phone.trim() === '' ||
                formData.phone === phoneMask,
            time: formData.time.trim() === '',
            consent: !formData.consent,
        }

        return errors
    }

    const validateForm = (): string => {
        const errorsFromForm = getFieldsErrors()
        const errorMessage = getFormError(errorsFromForm)
        setFormError(errorMessage)

        return errorMessage

        // const newErrors: { [key: string]: string } = {}
        // if (!formData.name.trim()) {
        //     newErrors.name = 'Поле обязательно для заполнения'
        // }
        // if (!formData.phone.trim()) {
        //     newErrors.phone = 'Поле обязательно для заполнения'
        // }
        // if (!formData.consent) {
        //     newErrors.consent = 'Необходимо согласие'
        // }
        // setErrors(newErrors)
        // return Object.keys(newErrors).length === 0
    }

    const normalizePhone = (value: string) => {
        return value.replace(/[^\d+]/g, '')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmit(true)
        if (validateForm() !== '') return

        const cleanedPhone = normalizePhone(formData.phone)
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: name !== 'consent' ? value : value === 'true',
        }))
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: name !== 'consent' ? false : value !== 'true',
        }))
    }

    return (
        <>
            {step === 'form' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} className="z-[70]">
                    <p className="bg-sub-title-gradient-mobi bg-clip-text pb-5 text-center text-4xl font-semibold uppercase text-transparent md:text-4xl">
                        Заказать звонок
                    </p>
                    <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <EnhancedInput
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                value={formData.name}
                                onChange={(value: string) =>
                                    handleChange({
                                        target: { name: 'name', value, type: 'text', checked: false },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                className={`border-2 ${formErrors.name ? 'border-[#bc8070] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'}
                                input-form-mobi-custom sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] w-full rounded-[50px] bg-transparent pl-[20px] text-xl font-medium text-white placeholder:font-medium placeholder:text-[#353652]`}
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
                                            target: { name: 'phone', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    onError={() =>
                                        setFormErrors((prev) => ({
                                            ...prev,
                                            phone: false,
                                        }))
                                    }
                                    //showInternalError={true}
                                    className={`${formErrors.phone ? 'border-[#bc8070] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'} sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] h-10 border-2 pl-[20px] text-xl focus:border-2`}
                                    labelClassName="hidden"
                                    wrapperClassName="w-full"
                                    //required={true}
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
                                onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                className={`${formErrors.time ? 'border-[#bc8070] hover:border-[#bc8070] focus:border-[#bc8070]' : 'border-[#878797]'} input-form-mobi-custom sm_l:placeholder:text-[14px] sm_s:placeholder:text-[14px] w-full rounded-[50px] border-2 bg-transparent pl-[20px] text-xl font-medium text-white placeholder:font-medium placeholder:text-[#353652]`}
                                label="Удобное время для звонка"
                                labelClassName="text-white text-xl"
                                wrapperClassName="w-full"
                            />
                        </div>
                        <div className="mb-2 flex items-center">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value: string) =>
                                    handleChange({
                                        target: { name: 'consent', value },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                label="Я согласен(а) на обработку персональных данных"
                                wrapperClassName="flex items-center"
                                labelClassName="text-xs font-medium md:text-sm"
                                checkboxIconSize="size-4"
                                error={formErrors.consent}
                            />
                        </div>
                        {formError && (
                            <p className="ml-[30px] text-sm font-medium leading-[18px] text-[#bc8070]">{formError}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`mx-auto mt-[13px] h-12 w-4/5 rounded-[50px] text-3xl font-semibold text-white md:text-4xl
                            ${isDisabled ? 'cursor-not-allowed bg-[#878797] opacity-100' : 'bg-sub-title-gradient-mobi'}
                            `}
                        >
                            Отправить заявку
                        </button>
                    </form>
                </Modal>
            )}

            {step === 'accepted' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} bgClass="bg-auto" className="z-[70]">
                    <h2 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold uppercase text-transparent md:text-4xl">
                        Заявка принята
                    </h2>
                    <p className="mb-1 px-3 pb-[18px] text-justify text-xl font-medium leading-[17px] text-[#878797] md:text-lg">
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
