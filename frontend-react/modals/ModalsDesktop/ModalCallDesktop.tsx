'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { useRouter } from 'next/navigation'
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

    const router = useRouter()
    const handleNavigateToProfessions = () => {
        onClose()
        router.push('/professions')
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        const allFieldsEmpty = !formData.name.trim() && !formData.phone.trim() && !formData.consent
        switch (true) {
            case allFieldsEmpty:
                newErrors.name = 'Заполните обязательные поля'
                newErrors.phone = 'Заполните обязательные поля'
                newErrors.consent = 'Заполните обязательные поля'
                break

            case !validateNameDesktop(formData.name).status:
                newErrors.name = validateNameDesktop(formData.name).textError
                break

            case !formData.phone.trim():
                newErrors.phone = 'Заполните обязательные поля'
                break

            case !formData.consent:
                newErrors.consent = 'Заполните обязательные поля'
                break

            default:
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // const normalizePhone = (value: string) => {
    //     return value.replace(/[^\d+]/g, '')
    // }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setInputTouched({
            name: true,
            phone: true,
            time: false,
        })
        const isValid = validateForm()
        if (!isValid) return

        // const cleanedPhone = normalizePhone(formData.phone)
        setStep('accepted')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
        if (name === 'name') {
            const result = validateNameDesktop(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    name: '',
                }))
            }
        }

        if (name === 'phone') {
            const result = validatePhoneDesktop(value)
            if (result.status) {
                setErrors((prev) => ({
                    ...prev,
                    phone: '',
                }))
            }
        }

        if (name === 'consent') {
            if (checked) {
                setErrors((prev) => ({
                    ...prev,
                    consent: '',
                }))
            }
        }
    }

    const handleInputBlur = (field: 'name' | 'phone') => {
        setInputTouched((prev) => ({
            ...prev,
            [field]: true,
        }))

        let error = ''
        if (field === 'name') {
            error = validateNameDesktop(formData.name)?.textError
        } else if (field === 'phone') {
            error = !validatePhoneDesktop(formData.phone)?.status ? 'Номер телефона введён не полностью' : ''
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
                    <div>
                        <button onClick={onClose} className="absolute right-7 top-6">
                            <X size={41} color="#FFFFFF" className="opacity-80 hover:opacity-100" />
                        </button>
                        <h3 className="text-13xl bg-gradient-desktop mx-auto mb-5 mt-20 w-[375px] whitespace-nowrap bg-clip-text font-medium uppercase leading-[100%] text-transparent">
                            Заказать звонок
                        </h3>
                        <form onSubmit={handleSubmit} className="px-[75px]">
                            <div className="mb-5 flex w-full flex-col">
                                <EnhancedInput
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя"
                                    maxLength={30}
                                    value={formData.name}
                                    onBlur={() => handleInputBlur('name')}
                                    onChange={(value: string) =>
                                        handleChange({
                                            target: { name: 'name', value, type: 'text', checked: false },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    className={`${
                                        inputTouched.name && validateNameDesktop(formData.name).styleError
                                            ? 'border-[#bc8070]'
                                            : 'border-[#878797]'
                                    } h-[50px] w-full rounded-[50px] border-2 bg-transparent py-[14px] pl-[20px] text-4xl font-medium text-white placeholder:text-2xl placeholder:text-[#353652] focus-visible:ring-offset-0`}
                                    label="Ваше имя*"
                                    labelClassName="text-2xl leading-[100%] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="mb-5 flex w-full flex-col">
                                <PhoneInputDesktop
                                    value={formData.phone}
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
                                    onBlur={() => handleInputBlur('phone')}
                                    labelClassName="leading-[100%]"
                                    wrapperClassName="w-full gap-0"
                                    required={true}
                                    className={`${
                                        inputTouched.phone && validatePhoneDesktop(formData.phone).styleError
                                            ? 'border-[#bc8070] focus:border-[#bc8070]'
                                            : 'border-[#878797] focus:border-[#878797]'
                                    } mt-0 h-[50px] py-[14px] pl-[20px] text-4xl placeholder:text-2xl placeholder:text-[#353652]`}
                                />
                            </div>
                            <div className="mb-[14px] flex w-full flex-col">
                                <EnhancedInput
                                    type="text"
                                    id="time"
                                    name="time"
                                    placeholder="Удобное время для звонка"
                                    maxLength={100}
                                    value={formData.time}
                                    onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                    className="h-[50px] w-full rounded-[50px] border-2 border-[#878797] bg-transparent py-[14px] pl-[20px] text-4xl font-medium text-white placeholder:text-2xl placeholder:text-[#353652] focus-visible:ring-offset-0"
                                    label="Удобное время для звонка"
                                    labelClassName="text-2xl leading-[100%] font-medium text-white"
                                    wrapperClassName="w-full"
                                />
                                {Object.values(errors).some((val) => val && val.trim() !== '') ? (
                                    <p className="error-form-desktop-custom mt-[10px]">
                                        {errors.name || errors.phone || errors.consent}
                                    </p>
                                ) : (
                                    <p className="mt-[10px] text-2xl font-medium leading-[100%] text-[#353652]">
                                        *Обязательное поле для ввода
                                    </p>
                                )}
                            </div>
                            <div className="">
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
                                    wrapperClassName="flex"
                                    checkboxIconSize="w-[18px]"
                                    labelClassName={`text-2xl w-[398px] whitespace-nowrap ${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                                />
                            </div>
                            <div className="mx-auto mt-[10px]">
                                <p className="text-2xl font-medium text-[#353652]">
                                    Защита от спама reCAPTCHA{' '}
                                    <Link
                                        href="/privacy-policy"
                                        onClick={onClose}
                                        className="hover:cursor underline-decoration-1 ml-1 text-2xl font-medium leading-[18px] text-[#353652] underline underline-offset-2"
                                    >
                                        Конфиденциальность
                                    </Link>{' '}
                                    <br />и{' '}
                                    <Link
                                        href="/privacy-policy"
                                        onClick={onClose}
                                        className="underline-decoration-1 mb-4 text-2xl font-medium leading-[18px] text-[#353652] underline underline-offset-2"
                                    >
                                        Условия использования
                                    </Link>
                                </p>
                            </div>
                            <div className="mb-10 mt-5 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="btn_modal_desktop"
                                    disabled={hasErrors}
                                    className={`mx-auto mb-3 h-16 rounded-full px-20 text-5xl font-semibold leading-[24.38px] ${
                                        hasErrors
                                            ? 'bg-[#878797] disabled:opacity-100'
                                            : 'bg-gradient-desktop hover:bg-gradient-desktop-hover'
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
                            <Button
                                onClick={handleNavigateToProfessions}
                                variant="default"
                                size="btn_modal_desktop"
                                className="bg-gradient-desktop hover:bg-gradient-desktop-hover mx-auto mt-8 rounded-full px-20 py-8 text-5xl font-semibold leading-[24px]"
                            >
                                Смотреть профессии
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ModalCallDesktop
