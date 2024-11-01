'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

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

    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name) newErrors.name = 'Введите Ваше имя'
        else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(formData.name)) {
            newErrors.name = 'Введите Ваше имя'
        }
        if (!formData.phone) newErrors.phone = 'Введите номер телефона'
        else if (!/^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/.test(formData.phone))
            newErrors.phone = 'Введите корректный номер телефона'
        if (!formData.consent) newErrors.consent = 'Подтвердите согласие на обработку данных'
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
            console.log('Форма отправлена:', formData)
        }
    }

    return (
        <div>
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
                            <label htmlFor="name" className="mb-1 text-2xl font-medium text-white">
                                Ваше имя*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Введите ваше имя"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-[#878797] rounded-[20px] p-4 w-full bg-transparent h-10 placeholder:text-4xl  placeholder:font-medium placeholder:text-[#353652] placeholder:opacity-100"
                            />
                            {errors.name && <p className="mb-1 mt-2 text-2xl text-[red]">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="mb-1 text-2xl font-medium text-white">
                                Номер телефона*
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+375 (__) ___-__-__"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border border-[#878797] rounded-[20px] p-4 w-full bg-transparent h-10 placeholder:text-4xl  placeholder:font-medium placeholder:text-[#353652] placeholder:opacity-100"
                            />
                            {errors.phone && <p className="mb-1 text-2xl mt-2 text-[red]">{errors.phone}</p>}
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
                        {errors.consent && <p className="mb-1 text-2xl text-[red]">{errors.consent}</p>}
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
        </div>
    )
}
export default ModalCallDesktop
