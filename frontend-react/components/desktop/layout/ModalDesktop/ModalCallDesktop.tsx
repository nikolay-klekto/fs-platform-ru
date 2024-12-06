'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

const ModalCallDesktop: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isModalOpen, setModalOpen] = useState(false)
    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    const [step, setStep] = useState<'form' | 'accepted' | null>('form')

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.consent) {
            newErrors.consent = 'Подтвердите согласие на обработку данных'
        }
        const nameValidation = validateNameDesktop(formData.name)
        if (nameValidation) {
            newErrors.name = 'Введите корректное имя'
        }
        const phoneValidation = validatePhoneDesktop(formData.phone)
        if (phoneValidation) {
            newErrors.phone = 'Введите корректный номер телефона'
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

    const handleClose = () => {
        setStep(null)
    }

    return (
        <>
            {step === 'form' && (
                <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={handleCloseModal} className="absolute top-4 right-4">
                            <X size={35} color="white" className="opacity-70" />
                        </button>
                        <div className="flex flex-col p-3 rounded-lg max-w-md mx-auto">
                            <h1 className="mb-1 text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent ">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="text-4xl font-bold text-[#878797] shadow-md">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form className="flex flex-col items-start space-y-2 pl-5 pr-5 " onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    validate={(value) =>
                                        validateNameDesktop(value)
                                            ? { textError: 'Введите корректное имя', status: false, styleError: true }
                                            : { textError: '', status: true, styleError: false }
                                    }
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Ваше имя*"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <EnhancedInput
                                    type="tel"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    validate={(value) =>
                                        validatePhoneDesktop(value)
                                            ? {
                                                  textError: 'Введите корректный номер телефона',
                                                  status: false,
                                                  styleError: true,
                                              }
                                            : { textError: '', status: true, styleError: false }
                                    }
                                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Номер телефона*"
                                    wrapperClassName="w-full"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="time" className="mb-1 text-2xl font-medium text-white">
                                    Удобное время для звонка
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] p-4 w-full bg-transparent h-10
                                placeholder:text-4xl  placeholder:font-medium placeholder:text-[#353652] placeholder:opacity-100"
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
                                    className="mr-2 appearance-none w-4 h-4 bg-transparent border-2 border-gray-600 rounded-sm checked:bg-blue-500 focus:outline-none focus:ring-0 checked:bg-blue-500 checked:border-blue-500
                                 checked:before:content-['✔'] checked:before:text-white checked:before:text-lg checked:before:flex checked:before:justify-center checked:before:items-center"
                                />
                                <label htmlFor="consent" className="text-2xl font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && (
                                <p className="mb-1 text-sm text-[red] custom_error_style_input">{errors.consent}</p>
                            )}
                            <div className="pl-1 mx-auto">
                                <p className="text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a href="#" className="text-2xl font-medium text-[#353652] underline hover:cursor">
                                        Конфиденциальность
                                    </a>{' '}
                                    и{' '}
                                    <a href="#" className="text-2xl font-medium text-[#353652] underline">
                                        Условия использования
                                    </a>
                                </p>
                            </div>
                            <Button
                                type="submit"
                                variant="default"
                                size="btn_modal_desktop"
                                className="px-20 mx-auto bg-gradient-desktop text-5xl rounded-full py-6 mt-1 hover:bg-gradient-desktop-hover"
                            >
                                Оставить заявку
                            </Button>
                        </form>
                    </div>
                </Modal>
            )}
            {step === 'accepted' && (
                <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={handleClose} className="absolute top-4 right-4">
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
                                    Смотреть професии
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
