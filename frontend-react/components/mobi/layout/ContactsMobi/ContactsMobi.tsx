'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { EnhancedTextareaMobi } from '../../shared/TextareaMobi'
import { validateNameMobi } from '../../commonMobi/validate/validateNameMobi'
import { validateEmailMobi } from '../../commonMobi/validate/validateEmailMobi'
import { validatePhoneMobi } from '../../commonMobi/validate/validatePhoneMobi'
import { validateRoleMobi } from '../../commonMobi/validate/validateRoleMobi'
import { validateTextareaMobi } from '../../commonMobi/validate/validateTextareaMobi'
import {
    contentContactsMobi,
    contentSocialContactsFirstMobi,
    contentSocialContactsSecondMobi,
} from './contentContactsMobi'

interface FormData {
    name: string
    email: string
    tel: string
    role?: string
    message: string
}

const ContactsMobi: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
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

    const [formError, setFormError] = React.useState('')

    const handleChange = (field: keyof FormData, value: string) => {
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
    }

    const updateFieldError = (field: keyof FormData, hasError: boolean) => {
        setFieldErrors((prev) => ({
            ...prev,
            [field]: hasError,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')

        const newFieldErrors = {
            name: formData.name.trim() === '',
            email: formData.email.trim() === '',
            tel: formData.tel.trim() === '',
            message: formData.message.trim() === '',
        }
        setEmptyFields(newFieldErrors)

        const hasEmptyField = Object.values(newFieldErrors).some((error) => error)
        if (hasEmptyField) {
            setFormError('Заполните обязательные поля')
            return
        }

        const hasErrors = Object.values(fieldErrors).some((error) => error)
        if (hasErrors) return

        setFormError('')
        console.log('Форма отправлена:', formData)
    }

    return (
        <>
            <div className="pt-10 px-[15px]">
                <div className="flex flex-col gap-4 pb-10">
                    <h2 className="text-9xl font-medium uppercase">Cвяжитесь с нами</h2>
                    <Button variant="select_btn_mobi" size="contacts_btn_mobi">
                        Хочу в команду
                    </Button>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        {contentContactsMobi.map((item) => (
                            <div
                                key={item.id}
                                className={`${item.id !== contentContactsMobi.length ? 'pb-[20px]' : ''}`}
                            >
                                <p className="pb-2.5px text-base font-semibold text-white/50">{item.title}</p>
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
                    <h3 className="text-9xl font-medium uppercase">Напишите нам</h3>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="flex flex-col gap-2.5 pt-5 pb-0.5">
                            <EnhancedInput
                                type="text"
                                id="name"
                                placeholder="Имя*"
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
                                wrapperClassName={'h-[46px]'}
                            />
                            <EnhancedInput
                                type="email"
                                id="email"
                                placeholder="E-mail*"
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
                                wrapperClassName={'h-[46px]'}
                            />
                            <EnhancedInput
                                type="tel"
                                id="tel"
                                placeholder="Телефон*"
                                variant={emptyFields.tel ? 'contacts_page_error_mobi' : 'contacts_page_mobi'}
                                size="contacts_page_mobi"
                                rounded="rounded_30"
                                value={formData.tel}
                                onChange={(value) => handleChange('tel', value)}
                                validate={(value) => {
                                    const validation = validatePhoneMobi(value)
                                    updateFieldError('tel', !validation.status)
                                    return validation
                                }}
                                wrapperClassName={'h-[46px]'}
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
                                wrapperClassName={'h-[46px]'}
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
                        <div className="flex flex-col justify-between h-[70px] sm_s:h-[108px] sm:h-[108px]">
                            {formError && <p className={cn('text-xs', 'text-destructive')}>{formError}</p>}
                            <div className="mt-auto flex items-center gap-[19px] md:gap-7  sm_s:flex-col sm_s:justify-between sm_s:items-start sm_s:gap-2 sm:flex-col sm:justify-between sm:items-start sm:gap-2">
                                <Button variant="select_btn_mobi" size="contacts_btn_send_mobi">
                                    Отправить
                                </Button>
                                <p className="w-full text-white/20 text-[8px] font-medium md:max-w-[60%] md:text-xs  ">
                                    Нажимая кнопку “Отправить”, я даю согласие на обработку своих персональных данных и
                                    соглашаюсь с Условиями использования и Политикой конфиденциальности
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="grid grid-cols-2 gap-5 pt-[49.2px] pb-[39.3px] w-full sm_s:grid-cols-1 sm_s:gap-5 sm:grid-cols-1 sm:gap-5">
                    <div className="flex flex-col justify-between h-[73px]">
                        {contentSocialContactsFirstMobi.map((item) => (
                            <a key={item.id} href={item.href} className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center justify-center w-[24.7px] h-[26.4px] rounded-full bg-gradient-desktop md:w-[27px] md:h-[29px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <p className="text-xs font-medium md:text-base">{item.name}</p>
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col justify-between h-[73px]">
                        {contentSocialContactsSecondMobi.map((item) => (
                            <a key={item.id} href={item.href} className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center justify-center w-[24.7px] h-[26.4px] rounded-full bg-gradient-desktop md:w-[27px] md:h-[29px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <p className="text-xs font-medium md:text-base">{item.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsMobi
