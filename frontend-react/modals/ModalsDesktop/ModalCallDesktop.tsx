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

interface ModalCallDesktopProps {
    onClose: () => void
}

const ModalCallDesktop: React.FC<ModalCallDesktopProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setStep('accepted')
        }
    }

    const [inputTouched, setInputTouched] = useState({
        email: false,
        phone: false,
    })

    const handleInputBlur = (field: 'phone') => {
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
                        <div className="ml-[75px] max-w-md flex-col  rounded-lg ">
                            <h1 className="mb-2 mt-[53px] bg-gradient-desktop bg-clip-text text-13xl font-medium leading-[44px] text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="mb-7 text-4xl font-medium leading-[22px] text-[#878797] shadow-md">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    value={formData.name}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="mb-5 h-10 w-full rounded-[20px] border border-[#878797] bg-transparent p-3 text-xl font-medium text-white"
                                    label="Ваше имя*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="tel"
                                    name="phone"
                                    placeholder="Номер телефона"
                                    value={formData.phone}
                                    onBlur={() => handleInputBlur('phone')}
                                    validate={(value) => validatePhoneDesktop(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                    className={`${
                                        inputTouched.phone && validatePhoneDesktop(formData.phone).styleError
                                            ? 'border-[#bc8070] focus:border-[#bc8070]'
                                            : 'border-[#878797] focus:border-[#878797]'
                                    } mb-2 h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white`}
                                    label="Телефон*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                    mask="+375 (99) 999-99-99"
                                    //maskPlaceholder="_"
                                />
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className="h-10 w-full rounded-[20px] border border-[#878797] bg-transparent p-3 text-xl font-medium text-white"
                                    label="Удобное время для звонка"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />

                                <p className="mb-3 mt-2 text-2xl font-medium leading-[18px] text-[#353652]">
                                    *Обязательное поле для ввода
                                </p>
                            </div>
                            <div className="flex w-full items-center px-[75px] text-[#A09ACF]">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-2 size-4 appearance-none rounded-sm border-2 border-gray-600 bg-transparent checked:border-blue-500 checked:bg-blue-500 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-lg checked:before:text-white checked:before:content-['✔'] focus:outline-none focus:ring-0"
                                />

                                <label htmlFor="consent" className="text-2xl font-medium leading-[18px] text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="mt-1 px-[75px] text-sm text-red-500">{errors.consent}</p>}
                            <div className="mx-auto pl-1">
                                <p className="px-[75px] text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="hover:cursor text-2xl font-medium leading-[18px] text-[#353652] underline"
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
                                    className="mx-auto mb-3 rounded-full bg-gradient-desktop px-20 text-5xl leading-6 hover:bg-gradient-desktop-hover "
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
                            <h1 className="mb-6 mt-10 bg-gradient-desktop bg-clip-text text-center text-13xl font-medium leading-[44px] text-transparent">
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
                                    className="mx-auto mt-8 rounded-full bg-gradient-desktop px-20 py-8 text-5xl font-semibold leading-[24px] hover:bg-gradient-desktop-hover"
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
