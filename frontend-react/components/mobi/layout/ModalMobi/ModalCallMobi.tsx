'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.name && formData.phone && formData.consent) {
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
                    <div className="relative rounded-[50px] bg-[url('/images/Subtract_modalCall_png.png')] bg-cover bg-no-repeat p-2">
                        <button
                            onClick={handleClose}
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
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Введите ваше имя"
                                    value={formData.name}
                                    validate={(value) =>
                                        validateNameMobi(value)
                                            ? { textError: 'Введите корректное имя', status: false, styleError: true }
                                            : { textError: '', status: true, styleError: false }
                                    }
                                    onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Ваше имя"
                                    labelClassName="text-white text-xl font-medium mb-1"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <EnhancedInput
                                    type="tel"
                                    name="phone"
                                    placeholder="+375 (__) ___-__-__"
                                    value={formData.phone}
                                    validate={(value) =>
                                        validatePhoneMobi(value)
                                            ? {
                                                  textError: 'Введите корректный номер телефона',
                                                  status: false,
                                                  styleError: true,
                                              }
                                            : { textError: '', status: true, styleError: false }
                                    }
                                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                    className="border border-[#878797] rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                    label="Номер телефона"
                                    wrapperClassName="w-full"
                                    labelClassName="text-white text-xl font-medium mb-1"
                                />
                            </div>
                            <div className="w-full flex flex-col mb-3 p-0.5">
                                <label htmlFor="time" className="text-white text-xl mb-1">
                                    Удобное время для звонка
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Введите удобное время"
                                    value={formData.time}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                                    className="border rounded-[20px] w-full bg-transparent h-10 p-3 text-xl font-medium text-white"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                                    className="mr-2"
                                />
                                <label htmlFor="consent" className="text-xs font-medium text-[#878797]">
                                    Я согласен(а) на обработку персональных данных
                                </label>
                            </div>
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

            {step === 'accepted' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div
                        className="relative rounded-[50px] bg-[url('/images/Subtract_modallCallAccept.png')] bg-cover bg-no-repeat px-2
                        sm_s:mx-2
                        sm_l:mx-4
                        sm_xl:mx-10
                        md:px-4 md:mx-15"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute -top-1 -right-1 rounded-[50px] bg-[#101030] bg-opacity-80"
                        >
                            <X size={30} color="#878797" />
                        </button>
                        <h1 className="text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-3">
                            ЗАЯВКА ПРИНЯТА
                        </h1>
                        <p className="mb-1 pl-3 text-base font-medium text-[#878797]">
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
