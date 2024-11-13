'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import ModalCallAcceptMobi from '@/components/mobi/layout/ModalMobi/ModalCallAcceptMobi'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

const ModalCallMobi: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isModalOpen, setModalOpen] = useState(false)
    const [isAcceptModalOpen, setAcceptModalOpen] = useState(false)

    // const handleOpenModal = () => setModalOpen(true)
    // const handleCloseModal = () => setModalOpen(false)
    const handleOpenAcceptModal = () => {
        setAcceptModalOpen(true)
        setModalOpen(false)
    }
    const handleCloseAcceptModal = () => setAcceptModalOpen(false)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name) newErrors.name = 'Введите ваше имя'
        else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(formData.name)) {
            newErrors.name = 'Введите корректное имя'
        }
        if (!formData.phone) newErrors.phone = 'Введите номер телефона'
        else if (!/^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона'
        }
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
            handleOpenAcceptModal()
        }
    }

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="relative rounded-[50px] bg-[url('/images/Subtract_modalCall_png.png')] bg-cover bg-no-repeat p-2">
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-1 -right-1 rounded-[50px] bg-[#101030] bg-opacity-80"
                        >
                            <X size={30} color="#878797" />
                        </button>
                        <h1 className="text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-1">
                            ЗАКАЗАТЬ ЗВОНОК
                        </h1>
                        <p className="mb-1 pl-3 text-base font-medium text-[#878797]">
                            Заполните поля – и мы с вами свяжемся
                        </p>

                        <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="name" className="text-white text-xl font-medium mb-1">
                                    Ваше имя
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="phone" className="text-white text-xl font-medium mb-1">
                                    Номер телефона
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="time" className="text-white text-xl mb-1">
                                    Удобное время для звонка
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Введите удобное время для звонка"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label htmlFor="consent" className="text-xs font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
                            <button
                                type="submit"
                                className="w-4/5 h-12 mx-auto mt-3 bg-sub-title-gradient-mobi rounded-[50px] text-3xl font-semibold text-white"
                            >
                                Отправить заявку
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <ModalCallAcceptMobi isOpen={isAcceptModalOpen} onClose={handleCloseAcceptModal} />
        </>
    )
}

export default ModalCallMobi
