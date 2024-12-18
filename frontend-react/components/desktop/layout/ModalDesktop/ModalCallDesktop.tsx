'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

interface ModalCallDesktopProps {
    isOpen: boolean
    onClose: () => void
}
const ModalCallDesktop: React.FC<ModalCallDesktopProps> = ({ isOpen, onClose }) => {
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

        const nameError = validateNameDesktop(formData.name)
        if (nameError) {
            newErrors.name = nameError
        } else if (!formData.name) {
            newErrors.name = 'Это поле обязательно для заполнения'
        }

        if (!formData.phone) {
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

    return (
        <>
            {step === 'form' && (
                <Modal show={isOpen} onClose={onClose} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={onClose} className="absolute top-4 right-4">
                            <X size={35} color="white" className="opacity-70" />
                        </button>
                        <div className="flex flex-col rounded-lg max-w-md mx-auto mt-8">
                            <h1 className="mb-1 text-13xl bg-gradient-desktop bg-clip-text text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="text-4xl text-[#878797] shadow-md mb-4">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form className="flex flex-col items-start space-y-2 ml-8 mr-12" onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Ваше имя*"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <PhoneInputDesktop
                                    value={formData.phone}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                    onError={(error) => setErrors((prev) => ({ ...prev, phone: error }))}
                                    externalError={errors.phone}
                                    inputClassName="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    inputERRAddStyle="border-red-500"
                                    inputNOERRAddStyle="border-[#878797]"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Удобное время для звонка"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                />

                                <p className="mt-2 mb-1 text-2xl font-medium text-[#353652]">
                                    *Обязательное поле для ввода
                                </p>
                            </div>
                            <div className="flex items-center w-full text-[#A09ACF]">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-2 appearance-none size-4 bg-transparent border-2 border-gray-600 rounded-sm checked:bg-blue-500 focus:outline-none focus:ring-0 checked:border-blue-500
                                 checked:before:content-['✔'] checked:before:text-white checked:before:text-lg checked:before:flex checked:before:justify-center checked:before:items-center"
                                />

                                <label htmlFor="consent" className="text-2xl font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="text-sm text-red-500 mt-1">{errors.consent}</p>}
                            <div className="pl-1 mx-auto">
                                <p className="text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="text-2xl font-medium text-[#353652] underline hover:cursor"
                                    >
                                        Конфиденциальность
                                    </a>{' '}
                                    <br />и{' '}
                                    <a href="href" className="text-2xl font-medium text-[#353652] underline">
                                        Условия использования
                                    </a>
                                </p>
                            </div>
                            <Button
                                type="submit"
                                variant="default"
                                size="btn_modal_desktop"
                                className="px-20 mx-auto bg-gradient-desktop text-5xl rounded-full mb-3 hover:bg-gradient-desktop-hover"
                            >
                                Оставить заявку
                            </Button>
                        </form>
                    </div>
                </Modal>
            )}
            {step === 'accepted' && (
                <Modal show={isOpen} onClose={onClose} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={onClose} className="absolute top-4 right-4">
                            <X size={35} color="white" className="opacity-70" />
                        </button>
                        <div className="flex flex-col p-3 rounded-lg max-w-md mx-auto">
                            <h1 className="mb-1 text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent text-center">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="text-4xl font-medium text-[#878797] shadow-md text-center">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на
                                сайте
                            </p>
                        </div>
                        <div className="flex justify-center items-center mb-6">
                            <Link href="href">
                                <Button
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="px-20 mx-auto bg-gradient-desktop text-5xl font-semibold rounded-full py-8 mt-1 hover:bg-gradient-desktop-hover"
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
