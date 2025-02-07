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
                        <button onClick={closeModal} className="absolute right-4 top-4">
                            <X size={35} color="white" className="opacity-70" />
                        </button>
                        <div className="mx-auto max-w-md flex-col rounded-lg">
                            <h1 className="text-13xl bg-gradient-desktop mb-1 bg-clip-text text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="mb-4 text-4xl text-[#878797] shadow-md">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-full flex-col">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    value={formData.name}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="h-10 w-full rounded-[20px] border border-[#878797] bg-transparent p-3 text-xl font-medium text-white"
                                    label="Ваше имя*"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex w-full flex-col">
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
                                    } h-10 w-full rounded-[20px] border bg-transparent p-3 text-xl font-medium text-white`}
                                    label="Телефон*"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                    mask="+375 (99) 999-99-99"
                                    maskPlaceholder="_"
                                />
                            </div>
                            <div className="flex w-full flex-col">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="h-10 w-full rounded-[20px] border border-[#878797] bg-transparent p-3 text-xl font-medium text-white"
                                    label="Удобное время для звонка"
                                    labelClassName="mb-1 text-2xl font-medium text-white"
                                    wrapperClassName="w-full"
                                />

                                <p className="mb-1 mt-2 text-2xl font-medium text-[#353652]">
                                    *Обязательное поле для ввода
                                </p>
                            </div>
                            <div className="flex w-full items-center text-[#A09ACF]">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-2 size-4 appearance-none rounded-sm border-2 border-gray-600 bg-transparent checked:border-blue-500 checked:bg-blue-500 checked:before:flex checked:before:items-center
                                 checked:before:justify-center checked:before:text-lg checked:before:text-white checked:before:content-['✔'] focus:outline-none focus:ring-0"
                                />

                                <label htmlFor="consent" className="text-2xl font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
                            <div className="mx-auto pl-1">
                                <p className="text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="hover:cursor text-2xl font-medium text-[#353652] underline"
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
                                className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mb-3 rounded-full px-20 text-5xl"
                            >
                                Оставить заявку
                            </Button>
                        </form>
                    </div>
                </Modal>
            )}
            {step === 'accepted' && (
                <Modal show={isOpen} onClose={closeModal} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={closeModal} className="absolute right-4 top-4">
                            <X size={35} color="white" className="opacity-70" />
                        </button>
                        <div className="mx-auto flex max-w-md flex-col rounded-lg p-3">
                            <h1 className="text-13xl bg-gradient-desktop mb-1 bg-clip-text text-center font-medium text-transparent">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="text-center text-4xl font-medium text-[#878797] shadow-md">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на
                                сайте
                            </p>
                        </div>
                        <div className="mb-6 flex items-center justify-center">
                            <Link href="href">
                                <Button
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-1 rounded-full px-20 py-8 text-5xl font-semibold"
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
