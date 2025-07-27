'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { EnhancedTextareaMobi } from '@/components/mobi/shared/TextareaMobi'
import { validateNameMobi } from '@/components/mobi/commonMobi/validate/validateNameMobi'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import { validateRoleMobi } from '@/components/mobi/commonMobi/validate/validateRoleMobi'
import { validateTextareaMobi } from '@/components/mobi/commonMobi/validate/validateTextareaMobi'
import {
    contentContactsMobi,
    contentSocialContactsFirstMobi,
    contentSocialContactsSecondMobi,
} from './contentContactsMobi/content'

import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'

interface IFormData {
    name: string
    email: string
    tel: string
    role?: string
    message: string
}

const ContactsMobi: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        email: '',
        tel: '',
        role: '',
        message: '',
    })

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        email: false,
        tel: false,
        role: false,
        message: false,
    })

    const [emptyFields, setEmptyFields] = useState({
        name: false,
        email: false,
        tel: false,
        message: false,
    })

    const [disableSubmit, setDisableSubmit] = useState(false)

    const { toast } = useToast()

    const handleChange = (field: keyof IFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        setEmptyFields((prev) => ({
            ...prev,
            [field]: false,
        }))

        setFieldErrors((prev) => ({
            ...prev,
            [field]: false,
        }))

        setDisableSubmit(false)
    }

    const updateFieldError = (field: keyof IFormData, hasError: boolean) => {
        setFieldErrors((prev) => ({
            ...prev,
            [field]: hasError,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newFieldErrors = {
            name: formData.name.trim() === '',
            email: formData.email.trim() === '',
            tel: formData.tel.trim() === '',
            message: formData.message.trim() === '',
        }
        setEmptyFields(newFieldErrors)

        const nameValidation = validateNameMobi(formData.name)
        updateFieldError('name', !nameValidation.status)

        setDisableSubmit(true)

        const hasEmptyField = Object.values(newFieldErrors).some((error) => error)
        if (hasEmptyField) {
            return
        }

        const hasErrors = Object.values(fieldErrors).some((error) => error)
        if (hasErrors) return

        toast({
            description: 'Спасибо! Ваша заявка была успешно отправлена',
        })

        setFormData({
            name: '',
            email: '',
            tel: '',
            role: '',
            message: '',
        })

        setFieldErrors({
            name: false,
            email: false,
            tel: false,
            role: false,
            message: false,
        })

        setEmptyFields({
            name: false,
            email: false,
            tel: false,
            message: false,
        })

        console.log('Форма отправлена:', formData)
    }

    return (
        <>
            <main className="bg-[#101030] text-white">
                <div className="px-[15px] pt-10">
                    <div className="flex flex-col gap-4 pb-10">
                        <h1 className="text-9xl font-medium uppercase">Cвяжитесь с нами</h1>
                        <Link href="/join-team">
                            <Button variant="select_mobi" size="contacts_btn_mobi">
                                Хочу в команду
                            </Button>
                        </Link>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                            {contentContactsMobi.map((item) => (
                                <div
                                    key={item.id}
                                    className={`${item.id !== contentContactsMobi.length ? 'pb-[20px]' : ''}`}
                                >
                                    <p className="pb-[2.5px] text-base font-semibold text-white/50">{item.title}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[21px] font-semibold"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-5xl font-semibold">{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-[58px]">
                        <h2 className="text-9xl font-medium uppercase">Напишите нам</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mt-5 flex flex-col gap-5">
                                <EnhancedInput
                                    type="text"
                                    id="name"
                                    placeholder="Ваше имя*"
                                    variant={emptyFields.name ? 'contacts_page_error_mobi' : 'contacts_page_mobi'}
                                    size="contacts_page_mobi"
                                    rounded="rounded_30"
                                    value={formData.name}
                                    onChange={(value) => handleChange('name', value)}
                                    validate={(value) => {
                                        const validation = validateNameMobi(value)
                                        updateFieldError('name', !validation.status)
                                        return validation
                                    }}
                                />
                                <PhoneInputMobi
                                    value={formData.tel}
                                    validationStatus={emptyFields.tel}
                                    onChange={(value) => handleChange('tel', value)}
                                    onError={() => {
                                        throw new Error('Error with phone input occured')
                                    }}
                                ></PhoneInputMobi>
                                <EnhancedInput
                                    type="email"
                                    id="email"
                                    placeholder="Ваш e-mail*"
                                    variant={emptyFields.email ? 'contacts_page_error_mobi' : 'contacts_page_mobi'}
                                    size="contacts_page_mobi"
                                    rounded="rounded_30"
                                    value={formData.email}
                                    onChange={(value) => handleChange('email', value)}
                                    validate={(value) => {
                                        const validation = validateEmailMobi(value)
                                        updateFieldError('email', !validation.status)
                                        return validation
                                    }}
                                />
                                <EnhancedInput
                                    type="text"
                                    id="role"
                                    placeholder="Клиент/партнер/соискатель"
                                    variant="contacts_page_mobi"
                                    size="contacts_page_mobi"
                                    rounded="rounded_30"
                                    value={formData.role}
                                    onChange={(value) => handleChange('role', value)}
                                    validate={(value) => {
                                        const validation = validateRoleMobi(value)
                                        updateFieldError('role', !validation.status)
                                        return validation
                                    }}
                                />

                                <EnhancedTextareaMobi
                                    name="message"
                                    id="message"
                                    placeholder="Опишите свой вопрос*"
                                    variant={emptyFields.message ? 'contacts_page_error_mobi' : 'contacts_page_mobi'}
                                    size="contacts_page_mobi"
                                    rounded="rounded_11"
                                    value={formData.message}
                                    onChange={(value) => handleChange('message', value)}
                                    validate={(value) => {
                                        const validation = validateTextareaMobi(value)
                                        updateFieldError('message', !validation.status)
                                        return validation
                                    }}
                                    wrapperClassName={'h-[104px]'}
                                />
                            </div>
                            <div className="sm_s:h-[108px] flex h-[70px] flex-col justify-between sm:h-[108px]">
                                <div
                                    className={
                                        'sm_s:flex-col sm_s:justify-between sm_s:items-start sm_s:gap-2 mt-auto  flex items-center gap-[19px] sm:flex-col sm:items-start sm:justify-between sm:gap-2 md:gap-7'
                                    }
                                >
                                    <Button
                                        variant="select_mobi"
                                        size="contacts_btn_send_mobi"
                                        disabled={disableSubmit}
                                    >
                                        <div
                                            className={`w-[calc(100%+6px)] -m-[3px] h-[calc(100%+6px)] flex items-center justify-center border- rounded-[50px] ${disableSubmit ? 'bg-[#878797] border-spacing-1 border-[#878797]' : ''}`}
                                        >
                                            Отправить
                                        </div>
                                    </Button>
                                    <p className="w-full text-[8px] font-medium text-white/20 md:max-w-[60%] md:text-xs  ">
                                        Нажимая кнопку “Отправить”, я даю согласие на обработку своих персональных
                                        данных и соглашаюсь с Условиями использования и Политикой конфиденциальности
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="sm_s:grid-cols-1 sm_s:gap-5 grid w-full grid-cols-2 gap-5 pb-[39.3px] pt-[49.2px] sm:grid-cols-1 sm:gap-5">
                        <div className="mb-[98px] flex h-[73px] flex-col justify-between">
                            {contentSocialContactsFirstMobi.map((item) => (
                                <a key={item.id} href={item.href} className="flex max-w-[300px] items-center gap-2">
                                    <div>
                                        <div className="bg-gradient-desktop flex h-[26.4px] w-[24.7px] items-center justify-center rounded-full md:h-[29px] md:w-[27px]">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium md:text-base">{item.name}</p>
                                </a>
                            ))}
                        </div>
                        <div className="flex h-[73px] flex-col justify-between">
                            {contentSocialContactsSecondMobi.map((item) => (
                                <a key={item.id} href={item.href} className="flex max-w-[300px] items-center gap-2">
                                    <div>
                                        <div className="bg-gradient-desktop flex h-[26.4px] w-[24.7px] items-center justify-center rounded-full md:h-[29px] md:w-[27px]">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium md:text-base">{item.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ContactsMobi
