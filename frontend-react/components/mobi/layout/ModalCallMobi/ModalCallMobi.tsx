'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

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

    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name) newErrors.name = 'Введите ваше имя'
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
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div
                        className="
                        relative 
                        rounded-[50px]
                        bg-[url('/images/Subtract_modalCall_png.png')]
                        bg-cover
                        bg-no-repeat p-2
                        "
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-1 -right-1 
                            rounded-[50px]
                            bg-[#101030] bg-opacity-80 "
                        >
                            <X size={30} color="#878797" />
                        </button>
                        <h1
                            className="text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-1
                            sm_xl:text-3xl
                            sm_l:text-2xl"
                        >
                            ЗАКАЗАТЬ ЗВОНОК
                        </h1>
                        <p
                            className="mb-1 pl-3 text-base font-medium text-[#878797]
                         sm_l:text-sm"
                        >
                            Заполните поля – и мы с вами свяжемся
                        </p>

                        <form className="flex flex-col items-start pl-2 pr-1 " onSubmit={handleSubmit}>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="name" className="text-white text-xl font-medium mb-1 sm_l:text-base">
                                    Ваше имя
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium
                                    placeholder:text-[#353652] placeholder:opacity-100 sm_l:text-base"
                                />
                                {errors.name && <p className="text-[red] text-xl mb-1 sm_l:text-sm">{errors.name}</p>}
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="phone" className="text-white text-xl font-medium mb-1 sm_l:base">
                                    Номер телефона
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium
                                    placeholder:text-[#353652] placeholder:opacity-100 sm_l:text-base"
                                />
                                {errors.phone && <p className="text-[red] text-xl mb-1 sm_l:text-sm">{errors.phone}</p>}
                            </div>
                            <div className=" mb-3 p-0.5 w-full flex flex-col">
                                <label htmlFor="time" className="text-white text-xl mb-1 sm_l:text-base">
                                    Удобное время для звонка
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Введите удобное время для звонка"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium
                                    placeholder:text-[#353652] placeholder:opacity-100 sm_l:text-base"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="mr-1 appearance-none w-4 h-4 bg-transparent border-2 border-gray-600 rounded-sm checked:bg-blue-500 focus:outline-none focus:ring-0 checked:bg-blue-500 checked:border-blue-500
                                    checked:before:content-['✔'] checked:before:text-white checked:before:text-lg checked:before:flex checked:before:justify-center checked:before:items-center"
                                />
                                <label htmlFor="consent" className="text-xs font-medium  text-[#878797] ">
                                    Я согласен(а){' '}
                                    <a
                                        href="google.com"
                                        className="text-xs font-medium  text-[#878797] underline hover:cursor"
                                    >
                                        на обработку персональных данных
                                    </a>
                                </label>
                            </div>
                            {errors.consent && <p className="text-[red] text-xl mb-1 sm_l:text-sm">{errors.consent}</p>}
                            <button
                                type="submit"
                                className="w-4/5 h-12 mx-auto mt-3 mb-3 bg-sub-title-gradient-mobi rounded-[50px] text-3xl font-semibold text-white
                                hover:bg-sub-title-gradient-mobi-hover
                                "
                            >
                                Отправить заявку
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCallMobi
