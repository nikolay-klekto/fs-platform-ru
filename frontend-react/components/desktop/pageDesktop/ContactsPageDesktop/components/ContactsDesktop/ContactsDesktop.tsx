'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'
import { useModal } from '@/context/ContextModal'

import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { EnhancedTextareaDesktop } from '@/components/desktop/shared/TextareaDesktop'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'
import { validateRoleDesktop } from '@/components/desktop/commonDesktop/validate/validateRoleDesktop'
import { validateTextareaDesktop } from '@/components/desktop/commonDesktop/validate/validateTextareaDesktop'
import { contentContactsDesktop, contentSocialContactsDesktop } from './contentContactsDesktop/content'

interface IFormData {
    name: string
    email: string
    tel: string
    role?: string
    message: string
}

const ContactsDesktop: React.FC = () => {
    const { openModal } = useModal()

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

    const [formError, setFormError] = React.useState('')
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
    }

    const updateFieldError = (field: keyof IFormData, hasError: boolean) => {
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

        setFormError('')
        console.log('Форма отправлена:', formData)
    }

    return (
        <>
            <main className="bg-[#101030] text-white">
                <div className="container relative flex justify-between overflow-hidden pb-[297px] pt-52 2xl:mx-auto 2xl:max-w-[1190px] 2xl:flex-col 2xl:items-center 2xl:pb-36 2xl:pt-28">
                    <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[653px]"></div>
                    <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                    <div className="3xl:mr-20 relative z-[1] mr-32 flex max-w-[541px] flex-col gap-7 2xl:mb-28 2xl:mr-0 2xl:max-w-none 2xl:self-start">
                        <h2 className="text-26xl 3xl:text-23xl font-semibold uppercase">Cвяжитесь с нами</h2>
                        <Button
                            variant="send_btn_desktop"
                            size="contacts_btn_desktop"
                            onClick={() => openModal('join_team_modal_desktop', 'desktop')}
                        >
                            Хочу в команду
                        </Button>
                    </div>
                    <div className="2xl:w-none relative z-[1] w-[1020px] 2xl:flex 2xl:w-full 2xl:flex-col">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                {contentContactsDesktop.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`${item.id !== contentContactsDesktop.length ? 'pb-[60px]' : ''}`}
                                    >
                                        <p className="pb-[5px] text-7xl font-semibold text-white/50">{item.title}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-15xl font-semibold"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-14xl font-semibold">{item.value}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-between pt-2.5">
                                {contentSocialContactsDesktop.map((item) => (
                                    <a key={item.id} href={item.href} className="flex max-w-[376px] items-center gap-5">
                                        <div>
                                            <div className="bg-gradient-desktop hover:bg-gradient-desktop-hover flex h-[62px] w-[58px] items-center justify-center rounded-full">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <p className="text-7xl font-medium">{item.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mb-[63px] mt-[99px] h-px w-full rounded-full bg-white/50"></div>
                        <div>
                            <h3 className="text-20xl font-semibold uppercase">Напишите нам</h3>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="flex justify-between pb-12 pt-14">
                                    <div className="flex flex-col gap-[23px]">
                                        <EnhancedInput
                                            type="text"
                                            id="name"
                                            placeholder="Имя*"
                                            variant={
                                                emptyFields.name
                                                    ? 'contacts_page_error_desktop'
                                                    : 'contacts_page_desktop'
                                            }
                                            size="contacts_page_desktop"
                                            rounded="rounded_53"
                                            value={formData.name}
                                            onChange={(value) => handleChange('name', value)}
                                            validate={(value) => {
                                                const validation = validateNameDesktop(value)
                                                updateFieldError('name', !validation.status)
                                                return validation
                                            }}
                                            wrapperClassName={'h-[76px]'}
                                        />
                                        <EnhancedInput
                                            type="email"
                                            id="email"
                                            placeholder="E-mail*"
                                            variant={
                                                emptyFields.email
                                                    ? 'contacts_page_error_desktop'
                                                    : 'contacts_page_desktop'
                                            }
                                            size="contacts_page_desktop"
                                            rounded="rounded_53"
                                            value={formData.email}
                                            onChange={(value) => handleChange('email', value)}
                                            validate={(value) => {
                                                const validation = validateEmailDesktop(value)
                                                updateFieldError('email', !validation.status)
                                                return validation
                                            }}
                                            wrapperClassName={'h-[76px]'}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[23px] pl-3">
                                        <EnhancedInput
                                            type="tel"
                                            id="tel"
                                            placeholder="Телефон*"
                                            variant={
                                                emptyFields.tel
                                                    ? 'contacts_page_error_desktop'
                                                    : 'contacts_page_desktop'
                                            }
                                            size="contacts_page_info_desktop"
                                            rounded="rounded_53"
                                            value={formData.tel}
                                            onChange={(value) => handleChange('tel', value)}
                                            validate={(value) => {
                                                const validation = validatePhoneDesktop(value)
                                                updateFieldError('tel', !validation.status)
                                                return validation
                                            }}
                                            wrapperClassName={'h-[76px]'}
                                        />
                                        <EnhancedInput
                                            type="text"
                                            id="role"
                                            placeholder="Клиент/партнер/соискатель"
                                            variant="contacts_page_desktop"
                                            size="contacts_page_info_desktop"
                                            rounded="rounded_53"
                                            value={formData.role}
                                            onChange={(value) => handleChange('role', value)}
                                            validate={(value) => {
                                                const validation = validateRoleDesktop(value)
                                                updateFieldError('role', !validation.status)
                                                return validation
                                            }}
                                            wrapperClassName={'h-[76px]'}
                                        />
                                    </div>
                                </div>
                                <EnhancedTextareaDesktop
                                    name="message"
                                    id="message"
                                    placeholder="Опишите свой вопрос*"
                                    variant={
                                        emptyFields.message ? 'contacts_page_error_desktop' : 'contacts_page_desktop'
                                    }
                                    size="contacts_page_desktop"
                                    rounded="rounded_33"
                                    value={formData.message}
                                    onChange={(value) => handleChange('message', value)}
                                    validate={(value) => {
                                        const validation = validateTextareaDesktop(value)
                                        updateFieldError('message', !validation.status)
                                        return validation
                                    }}
                                    wrapperClassName={'h-[272px]'}
                                />
                                <div className="flex h-[130px] flex-col justify-between">
                                    {formError && <p className={cn('text-xs', 'text-destructive')}>{formError}</p>}
                                    <div className="mt-auto flex items-center justify-between 2xl:justify-start 2xl:gap-10">
                                        <Button variant="send_btn_desktop" size="contacts_btn_send_desktop">
                                            Отправить
                                        </Button>
                                        <p className="max-w-[663px] pl-3 text-[17px] font-medium text-white/20">
                                            Нажимая кнопку “Отправить”, я даю согласие на обработку своих персональных
                                            данных и соглашаюсь с Условиями использования и Политикой конфиденциальности
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ContactsDesktop
