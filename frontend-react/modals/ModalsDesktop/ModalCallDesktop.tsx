'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'
import { useModal } from '@/context/ContextModal'
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

    const { closeModal } = useModal()
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
                <Modal show={isOpen} onClose={closeModal} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={closeModal} className="absolute top-6 right-7">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="flex-col rounded-lg max-w-md  ml-[75px] ">
                            <h1 className="mb-2 mt-[53px] text-13xl leading-[44px] font-medium bg-gradient-desktop bg-clip-text text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="text-4xl text-[#878797] leading-[22px] font-medium shadow-md mb-7">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    value={formData.name}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 mb-5 text-xl font-medium text-white"
                                    label="Ваше имя*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex flex-col w-full px-[75px]">
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
                                    } border rounded-[20px] w-full bg-transparent h-10 p-3 mb-2 text-xl font-medium text-white`}
                                    label="Телефон*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                    mask="+375 (99) 999-99-99"
                                    maskPlaceholder="_"
                                />
                            </div>
                            <div className="flex flex-col w-full px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Удобное время для звонка"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />

                                <p className="mt-2 mb-3 text-2xl leading-[18px] font-medium text-[#353652]">
                                    *Обязательное поле для ввода
                                </p>
                            </div>
                            <div className="flex items-center w-full text-[#A09ACF] px-[75px]">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-2 appearance-none size-4 bg-transparent border-2 border-gray-600 rounded-sm checked:bg-blue-500 focus:outline-none focus:ring-0 checked:border-blue-500 checked:before:content-['✔'] checked:before:text-white checked:before:text-lg checked:before:flex checked:before:justify-center checked:before:items-center"
                                />

                                <label htmlFor="consent" className="text-2xl leading-[18px] font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="text-sm text-red-500 mt-1 px-[75px]">{errors.consent}</p>}
                            <div className="pl-1 mx-auto">
                                <p className="text-2xl font-medium text-[#353652] px-[75px]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="text-2xl leading-[18px] font-medium text-[#353652] underline hover:cursor"
                                    >
                                        Конфиденциальность
                                    </a>{' '}
                                    <br />и{' '}
                                    <a
                                        href="href"
                                        className="text-2xl leading-[18px] font-medium text-[#353652] underline mb-4"
                                    >
                                        Условия использования
                                    </a>
                                </p>
                            </div>
                            <div className="flex justify-center mt-5 mb-10">
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="px-20 mx-auto bg-gradient-desktop text-5xl leading-6 rounded-full mb-3 hover:bg-gradient-desktop-hover "
                                >
                                    Оставить заявку
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
            {isOpen && step === 'accepted' && (
                <Modal show={isOpen} onClose={closeModal} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={closeModal} className="absolute top-4 right-4">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="flex flex-col p-3 rounded-lg max-w-md mx-auto">
                            <h1 className="mb-6 mt-10 text-13xl leading-[44px] font-medium bg-gradient-desktop bg-clip-text text-transparent text-center">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="text-4xl leading-[22px] font-medium text-[#878797] shadow-md text-justify">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими <br />
                                <span className="block text-center">услугами на сайте</span>
                            </p>
                        </div>
                        <div className="flex justify-center items-center mb-[67px]">
                            <Link href="href">
                                <Button
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="px-20 mx-auto bg-gradient-desktop text-5xl leading-[24px] font-semibold rounded-full py-8 mt-8 hover:bg-gradient-desktop-hover"
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
