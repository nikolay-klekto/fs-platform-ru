'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface FormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

const ModalCallDesktop: React.FC = () => {
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
        <div>
            <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={false}>
                <div>
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-4 right-4 text-10xl text-[#878797] hover:text-15xl "
                    >
                        X
                    </button>
                    <div className="flex flex-col items-center p-8 rounded-lg text-center max-w-md mx-auto">
                        <h1 className="mb-2 text-13xl bg-header-title-modal-desktop bg-clip-text text-transparent">
                            ЗАКАЗАТЬ ЗВОНОК
                        </h1>
                        <p className="mb-1 text-4xl text-[#878797] ">Заполните поля – и мы с вами свяжемся</p>
                    </div>
                    <form className="flex flex-col items-start space-y-4 " onSubmit={handleSubmit}>
                        <div className="div-input-modal-desktop">
                            <label htmlFor="name" className="label-modal-desktop">
                                Ваше имя*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Введите ваше имя"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-modal-desktop"
                            />
                            {errors.name && <p className="input-modal-error-desktop">{errors.name}</p>}
                        </div>
                        <div className="div-input-modal-desktop">
                            <label htmlFor="phone" className="label-modal-desktop">
                                Номер телефона*
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+375 (__) ___-__-__"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input-modal-desktop"
                            />
                            {errors.phone && <p className="input-modal-error-desktop">{errors.phone}</p>}
                        </div>
                        <div className="div-input-modal-desktop">
                            <label htmlFor="time" className="label-modal-desktop">
                                Удобное время для звонка
                            </label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                placeholder="Введите удобное время для звонка"
                                value={formData.time}
                                onChange={handleChange}
                                className="input-modal-desktop"
                            />
                            <p className="mb-1 text-2xl text-[#353652]">*Обязательное поле для ввода</p>
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
                            <label htmlFor="consent" className="text-2xl text-[#878797]">
                                Я согласен(а) на обработку персональных данных
                            </label>
                        </div>
                        {errors.consent && <p className="input-modal-error-desktop">{errors.consent}</p>}
                        <div className=" p-2 mx-auto">
                            <p className="mt-2 text-2xl text-[#353652]">
                                Защита от спама reCAPTCHA &nbsp; | &nbsp;
                                <a href="#" className="text-2xl text-[#353652] no-underline hover:underline">
                                    Конфиденциальность
                                </a>{' '}
                                и{' '}
                                <a href="#" className="text-2xl text-[#353652] no-underline hover:underline">
                                    Условия использования
                                </a>
                            </p>
                        </div>
                        <Button
                            type="submit"
                            variant="secondary"
                            size="btn_modal_desktop"
                            className="mx-auto w-full max-w-xs bg-btn-modal-desktop text-white text-5xl rounded-full py-10 mt-1 hover:bg-btn-hover-modal-desktop"
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
