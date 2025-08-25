'use client'
import * as React from 'react'
import { useState } from 'react'
import { EnhancedInput } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import Link from 'next/link'

interface IFormData {
    name: string
    phone: string
    time: string
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')
    const [inputTouched, setInputTouched] = useState({
        name: false,
        phone: false,
        time: false,
    })

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name.trim()) {
            newErrors.name = 'Поле обязательно для заполнения'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Поле обязательно для заполнения'
        }
        if (!formData.consent) {
            newErrors.consent = 'Необходимо согласие'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const normalizePhone = (value: string) => {
        return value.replace(/[^\d+]/g, '')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        const cleanedPhone = normalizePhone(formData.phone)
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }))
    }

    const handleInputBlur = (field: 'phone' | 'name' | 'time') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    return (
        <>
            {step === 'form' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} className="z-[70]">
                    <p className="bg-sub-title-gradient-mobi bg-clip-text pb-5 text-center text-4xl font-semibold text-transparent md:text-4xl">
                        ЗАКАЗАТЬ ЗВОНОК
                    </p>
                    <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <EnhancedInput
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                value={formData.name}
                                validate={(value) => validateNameMobi(value)}
                                onBlur={() => handleInputBlur('name')}
                                onChange={(value: string) =>
                                    handleChange({
                                        target: { name: 'name', value, type: 'text', checked: false },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                className={`border-2 ${
                                    inputTouched.name && validateNameMobi(formData.name).styleError
                                        ? 'border-[#bc8070]'
                                        : 'border-[#878797]'
                                }
h-10 w-full rounded-[50px] bg-transparent p-[0.875rem_3.1875rem_0.8125rem_1.25rem] text-xl font-medium text-[#878797] placeholder:text-xl placeholder:font-medium placeholder:text-[#353652] md:placeholder:text-2xl`}
                                label="Ваше имя*"
                                labelClassName="text-white text-xl font-medium"
                                wrapperClassName="w-full"
                            />
                            {errors.name && <p className="mt-1 text-sm text-[#bc8070]">{errors.name}</p>}
                        </div>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <PhoneInputMobi
                                value={formData.phone}
                                onChange={(value: string) =>
                                    handleChange({
                                        target: { name: 'phone', value, type: 'text', checked: false },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                onBlur={() => handleInputBlur('phone')}
                                onError={(error) =>
                                    setErrors((prev) => ({
                                        ...prev,
                                        phone: error || '',
                                    }))
                                }
                                showInternalError={true}
                                className={`border-2 p-[0.875rem_3.1875rem_0.8125rem_1.25rem] focus:border-2`}
                                labelClassName="text-xl leading-[18px] font-medium text-white mb-0"
                                wrapperClassName="w-full"
                                required={true}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-[#bc8070]">{errors.phone}</p>}
                        </div>
                        <div className="mb-3 flex w-full flex-col p-0.5">
                            <EnhancedInput
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Удобное время для звонка"
                                value={formData.time}
                                onBlur={() => handleInputBlur('time')}
                                onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                className="h-11 w-full rounded-[50px] border-2 border-[#878797] bg-transparent p-[0.875rem_3.1875rem_0.8125rem_1.25rem] text-xl font-medium text-[#878797] placeholder:text-xl placeholder:font-medium placeholder:text-[#353652]"
                                label="Удобное время для звонка"
                                labelClassName="text-white text-xl"
                                wrapperClassName="w-full"
                            />
                            {Object.keys(errors).length > 0 && (
                                <p className="mb-3 mt-2 text-sm font-medium leading-[18px] text-[#bc8070]">
                                    *Заполните обязательные поля
                                </p>
                            )}
                        </div>
                        <div className="mb-2 flex items-center">
                            <EnhancedInput
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={(value) => setFormData((prev) => ({ ...prev, consent: value === 'true' }))}
                                label="Я согласен(а) на обработку персональных данных"
                                wrapperClassName="flex items-center"
                                labelClassName="ml-1 text-xs font-medium md:text-sm"
                                checkboxIconSize="size-4"
                            />
                            {errors.consent && <p className="mt-1 text-sm text-[#bc8070]">{errors.consent}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={Object.values(errors).some((err) => err?.trim())}
                            className={`mx-auto p-[0.91rem_4.09rem] rounded-[50px] bg-sub-title-gradient-mobi text-white text-[1.0625rem] font-semibold md:text-4xl mt-[29px]  ${
                                Object.values(errors).some((err) => err?.trim())
                                    ? 'bg-[#878797] disabled:opacity-100'
                                    : 'bg-sub-title-gradient-mobi'
                            }`}
                        >
                            Отправить заявку
                        </button>
                    </form>
                </Modal>
            )}

            {step === 'accepted' && (
                <Modal variant="mobile" size="mobile-346" onClose={onClose} bgClass="bg-auto" className="z-[70]">
                    <h2 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                        ЗАЯВКА ПРИНЯТА
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
