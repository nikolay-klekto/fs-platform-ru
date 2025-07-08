'use client'
import React, { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { validatePhoneMobi } from '@/components/mobi/commonMobi/validate/validatePhoneMobi'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
    const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; consent?: boolean }>({
        name: false,
        phone: false,
        consent: false,
    })
    const [errorMessage, setErrorMessage] = useState<{ phoneMessage?: string; emptyFieldMessage?: string }>({
        phoneMessage: '',
        emptyFieldMessage: '',
    })
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {}

        const newMessages = {
            phoneMessage: '',
            emptyFieldMessage: '',
        }

        if (!validatePhoneMobi(formData.phone).status) {
            newErrors.phone = true
            newMessages.phoneMessage = 'Номер телефона введён не полностью'
        }
        if (!formData.name) {
            newErrors.name = true
            newMessages.emptyFieldMessage = '*Заполните обязательные поля'
        }
        if (!formData.consent) {
            newErrors.consent = true
            newMessages.emptyFieldMessage = '*Заполните обязательные поля'
        }

        setErrors(newErrors)
        setErrorMessage(newMessages)

        return !Object.values(newErrors).some((error) => error === true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return
        const cleanedPhone = formData.phone.replace(/[^\d+]/g, '')
        const dataToSend = {
            ...formData,
            phone: cleanedPhone,
        }
        console.log('отправляется на сервер: ', dataToSend)
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target

        const updatedValue = type === 'checkbox' ? checked : value

        const safeValue = name === 'name' ? value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '') : updatedValue

        setFormData((prev) => ({
            ...prev,
            [name]: safeValue,
        }))

        if (name === 'consent') {
            setErrors((prev) => ({
                ...prev,
                consent: !checked,
            }))
        }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target

        setErrors((prev) => {
            const updatedErrors = { ...prev }

            if (name === 'phone') {
                const result = validatePhoneMobi(value)
                updatedErrors.phone = !result.status
            }

            if (name === 'name') {
                updatedErrors.name = !value
            }

            if (name === 'consent') {
                updatedErrors.consent = !checked
            }

            return updatedErrors
        })
    }

    const hasErrors = useMemo(() => {
        return Object.values(errors).some(Boolean)
    }, [errors])

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
                        <div className="rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 pt-10 pb-9">
                            <p className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                                ЗАКАЗАТЬ ЗВОНОК
                            </p>
                            <form className="flex flex-col items-start pl-2 pr-1" onSubmit={handleSubmit}>
                                <div className="flex w-full flex-col p-0.5">
                                    <EnhancedInput
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя*"
                                        value={formData.name}
                                        onChange={(value: string) =>
                                            handleChange({
                                                target: { name: 'name', value, type: 'text', checked: false },
                                            } as React.ChangeEvent<HTMLInputElement>)
                                        }
                                        onBlur={handleInputBlur}
                                        className={`border-2 ${
                                            errors.name
                                                ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070] focus:bg-[#1f203f]'
                                                : 'border-[#878797] bg-transparent focus:border-[#878797]'
                                        } h-10 w-full rounded-[50px] p-4 text-xl font-medium text-white placeholder:text-xl placeholder:font-medium placeholder:text-[#353652] focus:bg-[#1f203f] focus:ring-0 focus:ring-offset-0 md:placeholder:text-2xl`}
                                        label="Ваше имя*"
                                        labelClassName="text-white text-xl font-medium"
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
                                        onBlur={handleInputBlur}
                                        className={`mb-4 border-2 text-xl focus:border-2 focus:ring-0 focus:ring-offset-0 ${
                                            errors.phone
                                                ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]'
                                                : 'border-[#878797] focus:border-[#878797]'
                                        }`}
                                        labelClassName="text-2xl leading-[18px] font-medium text-white mb-0"
                                        wrapperClassName="w-full"
                                        required={true}
                                    />
                                </div>
                                <div className="flex w-full flex-col p-0.5">
                                    <label>
                                        <p className="mb-2 text-xl text-white font-medium">Удобное время для звонка</p>
                                        <input
                                            type="text"
                                            id="time"
                                            name="time"
                                            placeholder="Удобное время для звонка"
                                            value={formData.time}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9: ]/g, '')
                                                handleChange({
                                                    target: {
                                                        name: 'time',
                                                        value: value,
                                                        type: 'text',
                                                        checked: false,
                                                    },
                                                } as React.ChangeEvent<HTMLInputElement>)
                                            }}
                                            className="mb-3 h-10 w-full rounded-[50px] border-2 border-[#878797] bg-transparent p-4 text-xl font-medium text-white placeholder:text-xl placeholder:font-medium placeholder:text-[#353652] focus:border-[#878797] focus:outline-none focus:ring-0 focus:ring-offset-0"
                                        />
                                    </label>
                                </div>
                                <div className="flex items-center pt-1">
                                    <EnhancedInput
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onBlur={handleInputBlur}
                                        onChange={(value: string) => {
                                            handleChange({
                                                target: {
                                                    name: 'consent',
                                                    value,
                                                    type: 'checkbox',
                                                    checked: value === 'true',
                                                },
                                            } as React.ChangeEvent<HTMLInputElement>)
                                        }}
                                        label="Cогласен(а) на обработку персональных данных"
                                        hasErrors={errors.consent}
                                        wrapperClassName="flex gap-1"
                                        checkboxIconSize="w-[20px]"
                                        labelClassName={`${formData.consent ? 'text-white' : 'text-[#878797]'} text-xs`}
                                    />
                                </div>
                                <p className="error-form-desktop-custom mb-2 ml-8 text-xs">
                                    {hasErrors && (errorMessage.emptyFieldMessage || errorMessage.phoneMessage)}
                                </p>
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="send_btn_desktop"
                                    disabled={hasErrors}
                                    className={`
                                        w-72 mx-auto mt-1 h-12 rounded-[50px] 
                                        text-3xl font-semibold text-white md:text-4xl disabled:opacity-100
                                        ${hasErrors ? '!bg-[#878797]' : 'bg-gradient-mobi'}
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
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%] p-1"
                        >
                            <X size={24} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="rounded-[50px] bg-[url('/background/Subtract_modallCallAccept.png')] bg-cover bg-[right_top] bg-no-repeat px-3 pb-7 pt-10">
                            <p className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-4xl">
                                ЗАЯВКА ПРИНЯТА
                            </p>
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
