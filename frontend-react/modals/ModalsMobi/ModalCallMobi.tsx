'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckedBoxFormMobi, UncheckedBoxFormMobi, ErrorUncheckedBoxFormMobi } from '@/components/assets/iconsMobi'

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
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {}

        if (!validatePhoneMobi(formData.phone).status) {
            newErrors.phone = true
        }
        if (!formData.consent) {
            newErrors.consent = true
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log(formData)
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
        if (name === 'name') {
            if (name) {
                setFormData((prevData) => {
                    return {
                        ...prevData,
                        name: value,
                    }
                })
            }
        }

        if (name === 'phone') {
            const result = validatePhoneMobi(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    phone: result.status ? false : true,
                }))
            }
            validateForm()
        }

        if (name === 'consent') {
            if (checked) {
                setErrors((prev) => ({
                    ...prev,
                    consent: checked ? false : true,
                }))
            }
            validateForm()
        }
    }

    const handleInputBlur = () => {
        const isValid = validatePhoneMobi(formData.phone).status
        setErrors((prev) => ({
            ...prev,
            phone: !isValid,
        }))
    }

    const hasErrors = Object.values(errors).some((err) => err === true)

    return (
        <>
            {step === 'form' && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="relative mx-4 w-full max-w-md ">
                        <button
                            onClick={onClose}
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%] p-1"
                        >
                            <X size={30} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className=" rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                            <p className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                                ЗАКАЗАТЬ ЗВОНОК
                            </p>
                            <p className="pb-4 pl-3 text-base font-medium text-[#878797] md:text-lg">
                                Заполните поля – и мы с вами свяжемся
                            </p>
                            <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                                <div className="flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя"
                                        value={formData.name}
                                        validate={(value) => validateNameMobi(value)}
                                        onChange={(value: string) =>
                                            handleChange({
                                                target: { name: 'name', value, type: 'text', checked: false },
                                            } as React.ChangeEvent<HTMLInputElement>)
                                        }
                                        className={`border-2 ${
                                            hasErrors && validateNameMobi(formData.name).styleError
                                                ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070] focus:bg-[#1f203f]'
                                                : 'border-[#878797] bg-transparent focus:border-[#878797]'
                                        } h-10 w-full rounded-[50px] p-4 text-xl font-medium text-[#878797] placeholder:text-xl placeholder:font-medium placeholder:text-[#353652] focus:bg-[#1f203f] focus:ring-0 focus:ring-offset-0 md:placeholder:text-2xl`}
                                        label="Ваше имя"
                                        labelClassName="mb-2 text-white text-xl font-medium"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                <div className="flex w-full flex-col p-0.5">
                                    <PhoneInputMobi
                                        value={formData.phone}
                                        onChange={(value: string) =>
                                            handleChange({
                                                target: { name: 'phone', value, type: 'text', checked: false },
                                            } as React.ChangeEvent<HTMLInputElement>)
                                        }
                                        onBlur={() => handleInputBlur()}
                                        onError={() => {}}
                                        className={`mb-6 border-2 focus:border-2 focus:ring-0 focus:ring-offset-0 ${
                                            hasErrors && validatePhoneMobi(formData.phone).styleError
                                                ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]'
                                                : 'border-[#878797] focus:border-[#878797]'
                                        }`}
                                        labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white mb-0"
                                        wrapperClassName="w-full"
                                        required={true}
                                    />
                                </div>
                                <div className="flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="text"
                                        id="time"
                                        name="time"
                                        placeholder="Удобное время для звонка"
                                        value={formData.time}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                        className="h-11 w-full rounded-[50px] border-2 border-[#878797] bg-transparent p-4 text-base font-medium text-[#878797] placeholder:text-sm placeholder:font-medium placeholder:text-[#353652] focus:ring-0 focus:ring-offset-0"
                                        label="Удобное время для звонка"
                                        labelClassName="mb-2 text-white text-xl"
                                        wrapperClassName="w-full"
                                    />
                                    {hasErrors ? (
                                        <p className="mt-2 text-sm font-medium leading-[18px] text-[#bc8070]">
                                            Заполните обязательные поля
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-sm font-medium leading-[18px] text-[#353652] ">
                                            *Обязательное поле для ввода
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2 flex items-center pt-4">
                                    <label
                                        htmlFor="consent"
                                        className="mb-1 flex cursor-pointer items-center gap-2 text-xs font-medium text-[#878797] md:text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={(e) => {
                                                handleChange({
                                                    target: {
                                                        name: 'consent',
                                                        value: e.target.checked.toString(),
                                                        type: 'checkbox',
                                                        checked: e.target.checked,
                                                    },
                                                } as React.ChangeEvent<HTMLInputElement>)
                                                validateForm()
                                            }}
                                            className="mr-2 hidden size-4 appearance-none rounded-[2px] border-2 border-[#878797] checked:border-transparent checked:bg-[#878797]"
                                        />
                                        {!formData.consent ? (
                                            <UncheckedBoxFormMobi />
                                        ) : hasErrors ? (
                                            <ErrorUncheckedBoxFormMobi />
                                        ) : (
                                            <CheckedBoxFormMobi />
                                        )}
                                        Cогласен(а) на обработку персональных данных
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={hasErrors}
                                    className={`
                                        mx-auto mt-1 h-12 w-4/5 rounded-[50px] 
                                        text-3xl font-semibold text-white md:text-4xl
                                        ${hasErrors ? 'bg-[#878797]' : 'bg-gradient-mobi'}
                                    `}
                                >
                                    Отправить заявку
                                </Button>
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
                                <Link
                                    href="/professions"
                                    onClick={onClose}
                                    className="flex h-10 w-full items-center justify-center rounded-[50px] bg-[#101030] text-3xl font-semibold text-white"
                                >
                                    Смотреть
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCallMobi
