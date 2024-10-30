import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

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
            <Button onClick={handleOpenModal}>Открыть окно Mobi</Button>
            <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={false}>
                <Button
                    onClick={handleCloseModal}
                    variant="select_mobi"
                    size="icon"
                    className="absolute top-0 right-0 sm:size-[50px]"
                >
                    X
                </Button>
                <div
                    className="flex flex-col items-center relative max-w-md mx-auto p-8 rounded-lg text-center
                                   "
                >
                    <h1
                        className="mb-2 text-4xl bg-header-title-modal-mobi
                        bg-clip-text text-transparent"
                    >
                        ЗАКАЗАТЬ ЗВОНОК
                    </h1>
                    <p className="mb-1 text-base text-[#878797] ">Заполните поля – и мы с вами свяжемся</p>
                </div>
                <form className="flex flex-col items-start space-y-4" onSubmit={handleSubmit}>
                    <div className="div-input-modal-mobi">
                        <label htmlFor="name" className="label-modal-mobi">
                            Ваше имя*
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Введите ваше имя"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-modal-mobi"
                        />
                        {errors.name && <p className="input-modal-error-mobi">{errors.name}</p>}
                    </div>
                    <div className="div-input-modal-mobi">
                        <label htmlFor="phone" className="label-modal-mobi">
                            Номер телефона*
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+375 (__) ___-__-__"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-modal-mobi"
                        />
                        {errors.phone && <p className="input-modal-error-mobi">{errors.phone}</p>}
                    </div>
                    <div className="div-input-modal-mobi">
                        <label htmlFor="time" className="label-modal-mobi">
                            Удобное время для звонка
                        </label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            placeholder="Введите удобное время для звонка"
                            value={formData.time}
                            onChange={handleChange}
                            className="input-modal-mobi"
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
                        <label htmlFor="consent" className="text-xs">
                            Я согласен(а) на обработку персональных данных
                        </label>
                    </div>
                    {errors.consent && <p className="input-modal-error-mobi">{errors.consent}</p>}
                    <Button
                        type="submit"
                        variant="secondary"
                        size="btn_modal_mobi"
                        className="mx-auto w-full max-w-xs bg-btn-modal-mobi rounded-full py-3 text-5xl text-white hover:bg-btn-hover-modal-mobi"
                    >
                        Отправить заявку
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default ModalCallMobi
