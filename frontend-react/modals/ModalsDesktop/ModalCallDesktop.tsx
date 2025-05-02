'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
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

const ModalCallDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phone: '',
        time: '',
        consent: false,
    })
    const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({})
    const [step, setStep] = useState<'form' | 'accepted' | null>('form')
    const [inputTouched, setInputTouched] = useState({
        name: false,
        phone: false,
        time: false,
    })

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name.trim()) {
            newErrors.name = 'Это поле обязательно для заполнения'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Это поле обязательно для заполнения'
        }
        if (!formData.consent) {
            newErrors.consent = 'Подтвердите согласие на обработку данных'
        }

        setErrors(newErrors)
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
        console.log('value: ', value, 'checked: ', checked)
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
        if (name === 'name') {
            const result = validateNameDesktop(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    name: result.status ? '' : result.textError,
                }))
            }
        }

        if (name === 'phone') {
            const result = validatePhoneDesktop(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    phone: result.status ? '' : result.textError,
                }))
            }
        }

        if (name === 'consent') {
            if (checked) {
                setErrors((prev) => ({
                    ...prev,
                    consent: checked ? '' : 'Подтвердите согласие на обработку данных',
                }))
            }
        }
    }

    const handleInputBlur = (field: 'phone' | 'name') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))

        let error = ''
        if (field === 'name') {
            error = validateNameDesktop(formData.name)?.textError
        } else if (field === 'phone') {
            error = validatePhoneDesktop(formData.phone)?.textError
        }

        if (error) {
            setErrors((prev) => ({
                ...prev,
                [field]: error,
            }))
        } else {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
            }))
        }
    }

    const hasErrors = Object.values(errors).some((err) => err?.trim())

    return (
        <>
            {step === 'form' && (
                <Modal onClose={onClose} size="medium" showCloseButton={false}>
                    <div className="w-xl mb-6 mt-14 flex flex-col justify-end gap-4">
                        <button onClick={onClose} className="absolute right-7 top-6">
                            <X size={41} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                        <div className="mx-[75px] max-w-md flex-col rounded-lg text-center">
                            <h1 className="text-13xl pt-4 bg-gradient-desktop bg-clip-text font-medium leading-[44px] text-transparent">
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
                                    onBlur={() => handleInputBlur('name')}
                                    validate={(value) => validateNameDesktop(value)}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'name', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    className={`${
                                        inputTouched.name && validateNameDesktop(formData.name).styleError
                                            ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070] focus:bg-[#1f203f]'
                                            : 'border-[#878797] bg-transparent'
                                    } input-form-desktop-custom h-12 w-full rounded-[50px] border-2 p-4 text-4xl font-medium text-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                                    label="Ваше имя*"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                                <div className="h-5 mb-2">
                                    {errors.name && <p className="error-form-desktop-custom">{errors.name}</p>}
                                </div>
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <PhoneInputDesktop
                                    value={formData.phone}
                                    onBlur={() => handleInputBlur('phone')}
                                    onError={(error) => {
                                        setErrors((prev) => ({
                                            ...prev,
                                            phone: error,
                                        }))
                                    }}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'phone', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full gap-0"
                                    required={true}
                                    className={`${
                                        inputTouched.phone && validatePhoneDesktop(formData.phone).styleError
                                            ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]'
                                            : 'border-[#878797] focus:border-[#878797]'
                                    } h-12 p-4 text-4xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                                />
                                <div className="mb-2 h-5">
                                    {errors.phone && <p className="error-form-desktop-custom">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="flex w-full flex-col px-[75px]">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    maxLength={100}
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className="h-12 w-full rounded-[50px] border-2 border-[#878797] bg-transparent p-4 text-4xl font-medium text-white     focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    label="Удобное время для звонка"
                                    labelClassName="mb-2 text-2xl leading-[18px] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                                {hasErrors ? (
                                    <p className="error-form-desktop-custom mb-3">Заполните обязательные поля</p>
                                ) : (
                                    <p className="mb-3 mt-2 text-2xl font-medium leading-[18px] text-[#353652]">
                                        *Обязательное поле для ввода
                                    </p>
                                )}
                            </div>
                            <div className="h-5 px-[75px]">
                                <EnhancedInput
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: {
                                                name: 'consent',
                                                value,
                                                type: 'checkbox',
                                                checked: value === 'true',
                                            },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    label="Я согласен(а) на обработку персональных данных"
                                    wrapperClassName="flex gap-2"
                                    labelClassName={`${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                                />
                            </div>
                            {errors.consent && <p className="error-form-desktop-custom px-[75px]">{errors.consent}</p>}
                            <div>
                                <p className="px-[75px] mb-2 text-2xl font-medium text-[#353652]">
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
                                    size="btn_modal_desktop"
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
                            <h1 className="text-13xl bg-gradient-desktop mb-6 mt-10 bg-clip-text text-center font-medium leading-[44px] text-transparent">
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
                                    className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-8 rounded-full px-20 py-8 text-5xl font-semibold leading-[24px]"
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
