'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'

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
    const [step, setStep] = useState<'form' | 'accepted' | null>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [ModalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
        setStep('form')
    }

    const handleCloseModal = () => setModalOpen(false)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name.trim()) {
            newErrors.name = 'Поле обязательно для заполнения'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Поле обязательно для заполнения'
        }
        if (!formData.consent) {
            newErrors.consent = 'Необходимо согласие'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="relative rounded-[35px] bg-[url('/images/Subtract_modalCall_png.png')] bg-cover bg-no-repeat px-3 py-10 md:px-4 md:py-10 w-11/12 max-w-lg mx-auto">
                        <button
                            onClick={handleClose}
                            className="absolute -top-0 -right-0 rounded-full bg-[#101030] bg-opacity-80 p-1.5"
                        >
                            <X size={24} color="#878797" />
                        </button>
                        <p className="text-4xl md:text-5xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-1">
                            ЗАКАЗАТЬ ЗВОНОК
                        </p>
                        <p className="mb-1 pl-3 text-base md:text-lg font-medium text-[#878797]">
                            Заполните поля – и мы с вами свяжемся
                        </p>

                        <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    value={formData.name}
                                    validate={(value) => validateNameMobi(value)}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className={`border-2 ${
                                        errors.name ? 'border-red-500' : 'border-[#878797]'
                                    } rounded-[20px] w-full bg-transparent h-10 p-4 placeholder:text-xl md:placeholder:text-2xl placeholder:font-medium placeholder:text-[#353652]`}
                                    label="Ваше имя"
                                    labelClassName="text-white text-xl font-medium mb-1"
                                    wrapperClassName="w-full"
                                    externalError={errors.name} // добавляем отображение ошибки
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <PhoneInputMobi
                                    value={formData.phone}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                    onError={(error) => setErrors((prev) => ({ ...prev, phone: error }))}
                                    externalError={errors.phone}
                                    inputClassName={`border-2 ${
                                        errors.phone ? 'border-red-500' : 'border-[#878797]'
                                    } rounded-[20px] w-full bg-transparent h-10 p-4 placeholder:text-xl md:placeholder:text-2xl placeholder:font-medium placeholder:text-[#353652]`}
                                    inputERRAddStyle="border-red-500"
                                    inputNOERRAddStyle="border-[#878797]"
                                    labelClassName="text-white text-xl font-medium mb-1"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className="border-2 border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-4 placeholder:text-xl md:placeholder:text-2xl placeholder:font-medium placeholder:text-[#353652]"
                                    label="Удобное время для звонка"
                                    labelClassName="text-white text-xl mb-1"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                                    className="hidden"
                                />
                                <label htmlFor="consent" className="flex items-center">
                                    <span className="w-4 h-4 inline-block mr-2 border-2 rounded-[2px] border-[#878797] bg-transparent"></span>
                                    <span className="text-xs md:text-sm font-medium text-[#878797] ml-1">
                                        Я согласен(а) на обработку персональных данных
                                    </span>
                                </label>
                                {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-4/5 h-12 mx-auto mt-3 bg-sub-title-gradient-mobi rounded-[50px] text-3xl md:text-4xl font-semibold text-white"
                            >
                                Отправить заявку
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {step === 'accepted' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div
                        className="relative rounded-[20px] bg-[url('/images/Subtract_modallCallAccept.png')] bg-cover bg-no-repeat px-2
                        sm_s:mx-2 
                        sm_l:mx-4 
                        sm_xl:mx-10 
                        md:px-4 md:mx-15"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute -top-0 -rigth-0 rounded-full bg-[#101030] bg-opacity-80 p-1.5"
                        >
                            <X size={30} color="#878797" />
                        </button>
                        <h1 className="text-3xl md:text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-3">
                            ЗАЯВКА ПРИНЯТА
                        </h1>
                        <p className="mb-1 pl-3 text-base md:text-lg font-medium text-[#878797]">
                            Мы с вами свяжемся в ближайшее время,
                            <br />а пока вы можете ознакомиться с нашими
                            <br />
                            услугами на сайте.
                        </p>
                        <div className="flex justify-center items-center w-4/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi mb-2 mt-2">
                            <button
                                type="button"
                                className="w-full h-12 bg-[#101030] rounded-[55px] text-3xl font-semibold text-white"
                            >
                                Смотреть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCallMobi
