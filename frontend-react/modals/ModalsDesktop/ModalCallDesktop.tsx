'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'

interface IFormData {
    name: string
    phone: string
    time: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalCallDesktop = ({ onClose }: IModalContent) => {
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

        if (!validatePhoneDesktop(formData.phone).status) {
            newErrors.phone = true
            setErrorMessage((prev) => ({
                ...prev,
                phoneMessage: 'Номер телефона введён не полностью',
            }))
        }
        if (!formData.name) {
            newErrors.name = true
            setErrorMessage((prev) => ({
                ...prev,
                emptyFieldMessage: 'Введите обязательные поля',
            }))
        }
        if (!formData.consent) {
            newErrors.consent = true
            setErrorMessage((prev) => ({
                ...prev,
                emptyFieldMessage: 'Введите обязательные поля',
            }))
        }

        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            setErrorMessage((prev) => ({
                ...prev,
                phoneMessage: '',
                emptyFieldMessage: '',
            }))
        }
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
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
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    name: true,
                }))
            }
            const lettersValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')
            setFormData((prev) => ({ ...prev, name: lettersValue }))
        }

        if (name === 'phone') {
            const result = validatePhoneDesktop(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    phone: result.status ? false : true,
                }))
            }
        }

        if (name === 'consent') {
            if (checked) {
                setErrors((prev) => ({
                    ...prev,
                    consent: checked ? false : true,
                }))
            }
        }

        if (name === 'time') {
            if (value) {
                setFormData((prev) => ({
                    ...prev,
                    time: value,
                }))
            }
        }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target

        if (name === 'phone') {
            const result = validatePhoneDesktop(value)
            setErrors((prev) => ({ ...prev, phone: !result.status }))
        }

        if (name === 'name') {
            setErrors((prev) => ({ ...prev, name: !value.trim() }))
        }

        if (name === 'consent') {
            setErrors((prev) => ({ ...prev, consent: !checked }))
        }
    }

    const hasErrors = Object.values(errors).some((err) => err === true)

    return (
        <>
            {step === 'form' && (
                <Modal onClose={onClose} size="medium" showCloseButton={false}>
                    <div className="w-xl mb-6 flex h-[39rem] flex-col justify-end gap-4">
                        <button onClick={onClose} className="absolute right-7 top-6">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="mx-[75px] max-w-md flex-col rounded-lg text-center">
                            <h1 className="bg-gradient-desktop bg-clip-text text-13xl font-medium leading-[44px] text-transparent">
                                ЗАКАЗАТЬ ЗВОНОК
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    maxLength={30}
                                    value={formData.name}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'name', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    onBlur={handleInputBlur}
                                    className={`${
                                        errors.name
                                            ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070] focus:bg-[#1f203f]'
                                            : 'border-[#878797] bg-transparent'
                                    } input-form-desktop-custom h-12 w-full rounded-[50px] border-2 p-4 text-4xl font-medium text-white placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                                    label="Ваше имя*"
                                    labelClassName="mb-1 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <PhoneInputDesktop
                                    value={formData.phone}
                                    onBlur={handleInputBlur}
                                    onChange={(value: string) => {
                                        handleChange({
                                            target: { name: 'phone', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }}
                                    labelClassName="mb-1 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full gap-0"
                                    required={true}
                                    className={`${
                                        hasErrors && validatePhoneDesktop(formData.phone).styleError
                                            ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]'
                                            : 'border-[#878797] focus:border-[#878797]'
                                    } mb-6 h-12 w-full p-4 text-4xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                                />
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <label>
                                    <p className="mb-2 text-2xl font-medium leading-[18px] text-white">
                                        Удобное время для звонка
                                    </p>
                                    <input
                                        type="text"
                                        id="time"
                                        name="time"
                                        placeholder="Удобное время для звонка"
                                        maxLength={100}
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
                                        className="h-12 w-full rounded-[50px] border-2 border-[#878797] bg-transparent p-4 text-4xl font-medium text-white placeholder:text-[#353652] focus:outline-none focus:border-[#878797] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </label>

                                {hasErrors ? (
                                    <p className="error-form-desktop-custom mb-3  mt-2">
                                        {errorMessage.phoneMessage || errorMessage.emptyFieldMessage}
                                    </p>
                                ) : (
                                    <p className="mb-3 mt-2 text-2xl font-medium leading-[18px] text-[#353652]">
                                        *Обязательное поле для ввода
                                    </p>
                                )}
                            </div>
                            <div className="pl-[75px]">
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
                                    label="Я согласен(а) на обработку персональных данных"
                                    hasErrors={errors.consent}
                                    wrapperClassName="flex gap-1"
                                    checkboxIconSize="w-[18px]"
                                    labelClassName={`${formData.consent ? 'text-white' : 'text-[#878797]'} text-2xl`}
                                />
                            </div>
                            <div>
                                <p className="mb-2 px-[75px] text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <a
                                        href="href"
                                        className="hover:cursor ml-1 text-2xl font-medium leading-[18px] text-[#353652] underline"
                                    >
                                        Конфиденциальность
                                    </a>{' '}
                                    <br />и{' '}
                                    <a
                                        href="href"
                                        className="mb-4 text-2xl font-medium leading-[18px] text-[#353652] underline"
                                    >
                                        Условия использования
                                    </a>
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="send_btn_desktop"
                                    disabled={hasErrors}
                                    className={`mx-auto h-16 rounded-full px-20 text-5xl font-semibold leading-[24.38px] hover:bg-gradient-desktop-hover  disabled:opacity-100 ${
                                        hasErrors ? 'bg-[#878797]' : 'bg-gradient-desktop'
                                    }`}
                                >
                                    Оставить заявку
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
            {step === 'accepted' && (
                <Modal onClose={onClose} size="medium" showCloseButton={false}>
                    <div>
                        <button onClick={onClose} className="absolute right-4 top-4">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="mx-auto flex max-w-md flex-col rounded-lg p-3">
                            <h1 className="mb-6 mt-10 bg-gradient-desktop bg-clip-text text-center text-13xl font-medium leading-[44px] text-transparent">
                                ЗАЯВКА ПРИНЯТА
                            </h1>
                            <p className="text-justify text-4xl font-medium leading-[22px] text-[#878797] shadow-md">
                                Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими <br />
                                <span className="block text-center">услугами на сайте</span>
                            </p>
                        </div>
                        <div className="mb-[67px] flex items-center justify-center">
                            <Link href="/professions">
                                <Button
                                    variant="default"
                                    size="btn_modal_desktop"
                                    className="mx-auto mt-8 rounded-full bg-gradient-desktop px-20 py-8 text-5xl font-semibold leading-[24px] hover:bg-gradient-desktop-hover"
                                >
                                    Смотреть профессии
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ModalCallDesktop
