'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalCallDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [errors, setErrors] = useState<{ name?: string; phone?: string; time?: string; consent?: string }>({})
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')
    const [inputTouched, setInputTouched] = useState({
        name: false,
        phone: false,
        time: false,
    })

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name.trim()) {
            newErrors.name = 'Это поле обязательно для заполнения'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Это поле обязательно для заполнения'
        }
        if (!formData.consent) {
            newErrors.consent = 'Подтвердите согласие на обработку данных'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            setStep('accepted')
        }
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
                <Modal onClose={onClose} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={onClose} className="absolute right-7 top-6">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="mx-[75px] max-w-md flex-col rounded-lg text-center">
                            <h1 className="text-13xl bg-gradient-desktop mb-[2.56rem] mt-[53px] bg-clip-text font-medium leading-[44px] text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    maxLength={30}
                                    value={formData.name}
                                    onBlur={() => handleInputBlur('name')}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'name', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    className={`${
                                        inputTouched.name && validateNameDesktop(formData.name).styleError
                                            ? 'border-[#bc8070]'
                                            : 'border-[#878797]'
                                    } h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white focus-visible:ring-offset-0`}
                                    label="Ваше имя*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                                {errors.name && <p className="error-form-desktop-custom">{errors.name}</p>}
                            </div>
                            <div className="mb-5 flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="tel"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    onBlur={() => handleInputBlur('phone')}
                                    validate={(value) => validatePhoneDesktop(value)}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'phone', value, type: 'tel', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    className={`${
                                        inputTouched.phone && validatePhoneDesktop(formData.phone).styleError
                                            ? 'border-[#bc8070] focus:border-[#bc8070]'
                                            : 'border-[#878797] focus:border-[#878797]'
                                    } h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white focus-visible:ring-offset-0`}
                                    label="Номер телефона*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                    // mask="+375 (99) 999-99-99"
                                    // maskPlaceholder="_"
                                />
                                {errors.phone && <p className="error-form-desktop-custom">{errors.phone}</p>}
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    maxLength={100}
                                    value={formData.time}
                                    onBlur={() => handleInputBlur('time')}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className={`${
                                        inputTouched.time && !formData.time.trim()
                                            ? 'border-[#bc8070]'
                                            : 'border-[#878797]'
                                    } h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white focus-visible:ring-offset-0`}
                                    label="Удобное время для звонка"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                                <p className="mt-2 text-2xl font-medium leading-[18px] text-[#353652]">
                                    *Обязательное поле для ввода
                                </p>
                                {Object.keys(errors).length > 0 && (
                                    <p className="error-form-desktop-custom mb-3">Заполните обязательные поля</p>
                                )}
                            </div>
                            <div className="mb-3 px-[75px]">
                                <EnhancedInput
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: {
                                                name: 'consent',
                                                value,
                                                type: 'checkbox',
                                                checked: value === 'true',
                                            },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    label="Я согласен(а) на обработку персональных данных"
                                    wrapperClassName="flex gap-2 pb-2"
                                    labelClassName={`${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                                />
                            </div>
                            {errors.consent && <p className="error-form-desktop-custom px-[75px]">{errors.consent}</p>}
                            <div className="mx-auto mt-5">
                                <p className="px-[75px] text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="hover:cursor ml-1 text-2xl font-medium leading-[18px] text-[#353652] underline"
                                    >
                                        Конфиденциальность
                                    </a>{' '}
                                    <br />и{' '}
                                    <a
                                        href="href"
                                        className="mb-4 text-2xl font-medium leading-[18px] text-[#353652] underline"
                                    >
                                        Условия использования
                                    </a>
                                </p>
                            </div>
                            <div className="mb-10 mt-5 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="btn_modal_desktop"
                                    disabled={Object.keys(errors).length > 0}
                                    className={`mx-auto mb-3 h-16 rounded-full px-20 text-5xl font-semibold leading-[24.38px] ${
                                        Object.keys(errors).length > 0
                                            ? 'bg-[#878797] disabled:opacity-100'
                                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover'
                                    }`}
                                >
                                    Оставить заявку
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
            {step === 'accepted' && (
                <Modal onClose={onClose} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={onClose} className="absolute right-4 top-4">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="mx-auto flex max-w-md flex-col rounded-lg p-3">
                            <h1 className="text-13xl bg-gradient-desktop mb-6 mt-10 bg-clip-text text-center font-medium leading-[44px] text-transparent">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="text-justify text-4xl font-medium leading-[22px] text-[#878797] shadow-md">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими <br />
                                <span className="block text-center">услугами на сайте</span>
                            </p>
                        </div>
                        <div className="mb-[67px] flex items-center justify-center">
                            <Link href="href">
                                <Button
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-8 rounded-full px-20 py-8 text-5xl font-semibold leading-[24px]"
                                >
                                    Смотреть профессии
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ModalCallDesktop
