'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import { useModal } from '@/context/ContextModal'

interface IFormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalCallMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

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
    const phoneValidation = validatePhoneMobi(formData.phone)
    return (
        <>
            {step === 'form' && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="relative mx-4 w-full max-w-md ">
                        <button
                            onClick={onClose}
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                        >
                            <X size={24} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className=" rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                            <p className="text-4xl font-semibold text-transparent bg-sub-title-gradient-mobi bg-clip-text text-center mb-4">
                                ЗАКАЗАТЬ ЗВОНОК
                            </p>
                            <p className="pb-4 pl-3 text-base font-medium text-[#878797] md:text-lg">
                                Заполните поля – и мы с вами свяжемся
                            </p>

                            <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                                <div className="mb-3 flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя"
                                        value={formData.name}
                                        validate={(value) => validateNameMobi(value)}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                                        className={`
                                            h-12 w-full rounded-[50px] border-2 
                                            ${errors.name ? 'border-[#bc8070]' : 'border-[#878797]'} 
                                            bg-transparent px-4 py-2 
                                            text-4xl font-medium text-muted-foreground 
                                            placeholder:text-[#353652] placeholder:text-xl
                                          `}
                                        label="Ваше имя*"
                                        labelClassName="text-white text-xl font-medium"
                                        wrapperClassName="w-full"
                                        // externalError={errors.name}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-[#bc8070]">{errors.name}</p>}
                                </div>
                                <div className="mb-3 flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="tel"
                                        name="phone"
                                        placeholder=""
                                        value={formData.phone}
                                        onBlur={() => handleInputBlur('phone')}
                                        validate={(value) => validatePhoneMobi(value)}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                                        className={`border-2 ${
                                            errors.phone || (inputTouched.phone && phoneValidation.styleError)
                                                ? 'border-[#bc8070] focus:border-[#bc8070]'
                                                : 'border-[#878797] focus:border-[#878797]'
                                        } h-12 w-full rounded-[50px]  bg-transparent px-4 py-2 
                                            text-4xl font-medium text-muted-foreground 
                                            placeholder:text-[#353652] placeholder:text-xl`}
                                        label="Номер телефона*"
                                        labelClassName="text-white text-xl font-medium"
                                        wrapperClassName="w-full"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm  text-[#bc8070]">{errors.phone}</p>}
                                </div>
                                <div className="mb-3 flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="text"
                                        id="time"
                                        name="time"
                                        placeholder="Удобное время для звонка"
                                        value={formData.time}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                        className="h-12 w-full rounded-[50px] border-2 border-[#878797]  bg-transparent px-4 py-2 
                                            text-4xl font-medium text-muted-foreground 
                                            placeholder:text-[#353652] placeholder:text-xl"
                                        label="Удобное время для звонка"
                                        labelClassName="text-white text-xl"
                                        wrapperClassName="w-full"
                                    />
                                    <p className="mt-2 text-sm font-medium leading-[18px] text-[#353652] ">
                                        *Обязательное поле для ввода
                                    </p>
                                    {Object.keys(errors).length > 0 && (
                                        <p className="mb-3 mt-2 text-sm font-medium text-[#bc8070] leading-[18px]">
                                            Заполните обязательные поля
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2 flex items-center pt-4">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, consent: e.target.checked }))
                                        }
                                        className="mr-2 inline-block size-4 appearance-none rounded-[2px] border-2 border-[#878797] checked:border-transparent checked:bg-[#878797]"
                                    />
                                    <label
                                        htmlFor="consent"
                                        className="ml-1 cursor-pointer text-xs font-medium text-[#878797] md:text-sm"
                                    >
                                        Я согласен(а) на обработку персональных данных
                                    </label>
                                    {errors.consent && <p className="mt-1 text-sm text-[#bc8070]">{errors.consent}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-sub-title-gradient-mobi mx-auto mt-[30px] h-12 w-4/5 rounded-[50px] text-3xl font-semibold text-white md:text-4xl"
                                >
                                    Отправить заявку
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {step === 'accepted' && (
                <div className=" fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="relative mx-4 w-full max-w-md ">
                        <button
                            onClick={onClose}
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%]"
                        >
                            <X size={24} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="rounded-[50px] bg-[url('/background/Subtract_modallCallAccept.png')] bg-cover bg-[right_top] bg-no-repeat px-3 pb-7 pt-10">
                            <h1 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="mb-1 px-3 pb-[18px] text-justify text-xl font-medium leading-[17px] text-[#878797] md:text-lg">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на
                                сайте.
                            </p>
                            <div className="bg-sub-title-gradient-mobi mx-auto my-2 flex w-[180px] items-center justify-center rounded-[50px] p-[3px]">
                                <button
                                    type="button"
                                    className="h-10 w-full rounded-[50px] bg-[#101030] text-3xl font-semibold text-white"
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
