'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import { useModal } from '@/context/ContextModal'
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
    const { closeModal } = useModal()
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
    const [inputTouched, setInputTouched] = useState({
        email: false,
        phone: false,
    })

    const handleInputBlur = (field) => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }
    return (
        <>
            {step === 'form' && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="relative max-w-md w-full mx-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                        >
                            <X size={24} color="#878797" />
                        </button>
                        <div className=" rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat py-[40px] px-3">
                            <p className="text-4xl md:text-5xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent pb-4">
                                ЗАКАЗАТЬ ЗВОНОК
                            </p>
                            <p className="pb-4 pl-3 text-base md:text-lg font-medium text-[#878797]">
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
                                        } text-[#878797] font-medium text-xl rounded-[50px] w-full bg-transparent h-10 p-4 placeholder:text-xl md:placeholder:text-2xl placeholder:font-medium placeholder:text-[#353652]`}
                                        label="Ваше имя"
                                        labelClassName="text-white text-xl font-medium"
                                        wrapperClassName="w-full"
                                        externalError={errors.name} // добавляем отображение ошибки
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="w-full flex flex-col mb-3 p-0.5">
                                    <EnhancedInput
                                        type="tel"
                                        name="phone"
                                        placeholder="Номер телефона"
                                        value={formData.phone}
                                        onBlur={() => handleInputBlur('phone')}
                                        validate={(value) => validatePhoneMobi(value)}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                        className={`${
                                            inputTouched.phone && validatePhoneMobi(formData.phone).styleError
                                                ? 'border-[#bc8070] focus:border-[#bc8070]'
                                                : 'border-[#878797] focus:border-[#878797]'
                                        } border rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white`}
                                        label="Телефон*"
                                        labelClassName="mb-1 text-2xl font-medium text-white"
                                        wrapperClassName="w-full"
                                        mask="+375 (99) 999-99-99"
                                        maskPlaceholder="_"
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
                                        className="border-2 border-[#878797] rounded-[50px] w-full bg-transparent h-10 p-4 text-[#878797] font-medium text-xl placeholder:text-xl md:placeholder:text-2xl placeholder:font-medium placeholder:text-[#353652]"
                                        label="Удобное время для звонка"
                                        labelClassName="text-white text-xl"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                <div className="flex items-center mb-2 pt-4">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, consent: e.target.checked }))
                                        }
                                        className="appearance-none checked:bg-[#878797] checked:border-transparent border-2 border-[#878797] rounded-[2px] w-4 h-4 mr-2 inline-block"
                                    />
                                    <label
                                        htmlFor="consent"
                                        className="font-medium text-[#878797] cursor-pointer text-xs md:text-sm font-medium ml-1"
                                    >
                                        Я согласен(а) на обработку персональных данных
                                    </label>
                                    {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-4/5 h-12 mx-auto mt-[30px] bg-sub-title-gradient-mobi rounded-[50px] text-3xl md:text-4xl font-semibold text-white"
                                >
                                    Отправить заявку
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {step === 'accepted' && (
                <div className=" flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="fixed inset-0 z-[70]  max-w-md w-full mx-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 rounded-[50px] bg-[#101030] bg-opacity-[80%] p-[6px]"
                        >
                            <X size={24} color="#878797" />
                        </button>
                        <div className="rounded-[50px] bg-[url('/background/Subtract_modallCallAccept.png')] bg-cover bg-[right_top] bg-no-repeat py-[40px]">
                            <h1 className="text-3xl md:text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-3">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="mb-1 px-3 pb-[18px] text-justify md:text-lg font-medium text-[#878797]">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на
                                сайте.
                            </p>
                            <div className="flex justify-center items-center w-4/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi mb-2 mt-2">
                                <button
                                    type="button"
                                    className="w-full h-12 bg-[#101030] rounded-[50px] text-3xl font-semibold text-white"
                                >
                                    Смотреть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCallMobi
