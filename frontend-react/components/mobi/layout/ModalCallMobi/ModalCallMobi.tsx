'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

const ModalCallMobi: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false)
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
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={handleCloseModal}
                >
                    <div
                        className="
                        relative 
                        bg-[url('/background/Subtract_modalCall_mobi.svg')] 
                        bg-cover bg-no-repeat p-10 
                        rounded-[50px] max-w-lg w-full
                        sm_l:bg-contain"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            onClick={handleCloseModal}
                            variant="select_mobi"
                            size="icon"
                            className="absolute top-0 right-0 text-5xl
                            lg:size-[50px] lg:text-4xl lg:w-[50px] lg:h-[50px] p-1 w-[40px] h-[40px]  
                            sm_xl:w-[30px] sm_xl:h-[30px] sm_xl:text-3xl sm_xl:p-0.5
                            sm_l:w-[20px] sm_l:h-[20px] sm_l:text-2xl sm_l:p-0.5
                           "
                        >
                            X
                        </Button>

                        <div className="flex flex-col items-center">
                            <h1
                                className="mb-2 text-4xl bg-header-title-modal-mobi bg-clip-text text-transparent
                                sm_l:text-3xl"
                            >
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                            <p className="mb-1 text-base text-[#878797] sm_l:text-sm">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                        </div>
                        <form className="flex flex-col items-start space-y-4 " onSubmit={handleSubmit}>
                            <div className="div-input-modal-mobi">
                                <label htmlFor="name" className="label-modal-mobi sm_l:text-sm">
                                    Ваше имя*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-modal-mobi sm_l:text-sm"
                                />
                                {errors.name && <p className="input-modal-error-mobi sm_l:text-sm">{errors.name}</p>}
                            </div>
                            <div className="div-input-modal-mobi">
                                <label htmlFor="phone" className="label-modal-mobi sm_l:text-sm">
                                    Номер телефона*
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-modal-mobi sm_l:text-sm"
                                />
                                {errors.phone && <p className="input-modal-error-mobi sm_l:text-sm">{errors.phone}</p>}
                            </div>
                            <div className="div-input-modal-mobi">
                                <label htmlFor="time" className="label-modal-mobi sm_l:text-sm">
                                    Удобное время для звонка
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Введите удобное время для звонка"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="input-modal-mobi sm_l:text-sm"
                                />
                                <p className="mb-1 text-2xl text-[#353652] sm_l:text-sm">
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
                                    className="mr-2"
                                />
                                <label htmlFor="consent" className="text-xs sm_l:text-sm">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
                            {errors.consent && <p className="input-modal-error-mobi sm_l:text-sm">{errors.consent}</p>}
                            <Button
                                type="submit"
                                variant="secondary"
                                size="btn_modal_mobi"
                                className="mx-auto w-full max-w-xs bg-btn-modal-mobi rounded-full py-3 text-5xl text-white hover:bg-btn-hover-modal-mobi
                                sm_l:text-3xl"
                            >
                                Отправить заявку
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCallMobi
