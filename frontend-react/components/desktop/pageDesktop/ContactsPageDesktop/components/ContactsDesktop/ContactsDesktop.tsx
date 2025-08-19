'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useModal } from '@/context/ContextModal'

import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { EnhancedTextareaDesktop } from '@/components/desktop/shared/TextareaDesktop'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import { validatePhoneDesktop } from '@/components/desktop/commonDesktop/validate/validatePhoneDesktop'
import { validateRoleDesktop } from '@/components/desktop/commonDesktop/validate/validateRoleDesktop'
import { validateTextareaDesktop } from '@/components/desktop/commonDesktop/validate/validateTextareaDesktop'
import { contentContactsDesktop, contentSocialContactsDesktop } from './contentContactsDesktop/content'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'

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

    const [formError, setFormError] = React.useState('')

    const [isSubmit, setIsSubmit] = useState(false)

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

    const { toast } = useToast()

    const phoneMask = '+375 (__) ___-__-__'

    const handleChange = (field: keyof IFormData, value: string) => {
        console.log('val', value)
        setFormData((prev) => ({
            ...prev,
            [field]: value,
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

    const getFormError = (): string => {
        const errors = {
            name: formData.name.trim() === '',
            email: !validateEmailDesktop(formData.email).status || formData.email.trim() === '',
            tel:
                (!validatePhoneDesktop(formData.tel).status &&
                    (formData.tel.trim() !== '' || formData.tel !== phoneMask)) ||
                formData.tel.trim() === '' ||
                formData.tel === phoneMask,
            role: !validateRoleDesktop(formData.role!).status && formData.role?.trim() !== '',
            message: !validateTextareaDesktop(formData.message).status || formData.message.trim() === '',
        }

        console.log('All errors', errors)

        setFieldErrors(errors)
        if (
            formData.name.trim() === '' ||
            formData.email.trim() === '' ||
            formData.tel.trim() === '' ||
            formData.tel === phoneMask ||
            formData.message.trim() === ''
        ) {
            return '*Заполните обязательные поля'
        }

        if (errors.email) return 'Неверный формат почты'
        if (errors.tel) return 'Номер телефона введен неверно'
        if (errors.role) return 'Варианты ввода: клиент/партнер/соискатель'
        if (errors.message) return 'Введите текст, содержащий буквы'

        return ''
    }

    useEffect(() => {
        if (isSubmit) {
            const error = getFormError()
            setFormError(error)
            setIsSubmitDisabled(Boolean(error))
        }
    }, [formData, isSubmit])

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            tel: '',
            role: '',
            message: '',
        })
        setIsSubmit(false)
        setFieldErrors({
            name: false,
            email: false,
            tel: false,
            role: false,
            message: false,
        })
        setFormError('')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmit(true)
        setFormError('')

        const error = getFormError()
        console.log(error)

        if (error !== '') {
            setFormError(error)
            setIsSubmitDisabled(true)
        } else {
            toast({
                description: 'Спасибо! Ваша заявка была успешно отправлена',
            })

            resetForm()
            console.log('Форма отправлена:', formData)
        }
    }

    return (
        <main className="bg-[#101030] text-white">
            <div className="container relative flex justify-between overflow-hidden pb-[297px] pt-52 2xl:mx-auto 2xl:max-w-[1190px] 2xl:flex-col 2xl:items-center 2xl:pb-36 2xl:pt-28">
                <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[150px] top-[653px]"></div>
                <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                <div className="3xl:mr-20 relative z-[1] mr-32 flex max-w-[541px] flex-col gap-7 2xl:mb-28 2xl:mr-0 2xl:max-w-none 2xl:self-start">
                    <h1 className="text-26xl 3xl:text-23xl font-semibold uppercase">Свяжитесь с нами</h1>
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
                        <h2 className="text-20xl font-semibold uppercase">Напишите нам</h2>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <div className="mb-[47px] mt-14 grid grid-cols-2 grid-rows-2 gap-x-[77px] gap-y-8">
                                <EnhancedInput
                                    type="text"
                                    id="name"
                                    placeholder="Ваше имя*"
                                    variant={fieldErrors.name ? 'contacts_page_error_desktop' : 'contacts_page_desktop'}
                                    size="contacts_page_desktop"
                                    rounded="rounded_53"
                                    value={formData.name}
                                    onChange={(value) => handleChange('name', value)}
                                />
                                <EnhancedInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Ваш e-mail*"
                                    autoComplete="email"
                                    variant={
                                        fieldErrors.email ? 'contacts_page_error_desktop' : 'contacts_page_desktop'
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
                                />
                                <PhoneInputDesktop
                                    value={formData.tel}
                                    onChange={(value: string) => {
                                        handleChange('tel', value)
                                    }}
                                    onError={(error: string) => {
                                        updateFieldError('tel', !!error)
                                    }}
                                    error={fieldErrors.tel}
                                    className={`
                                        h-[53px] rounded-[53px] border-2 px-4 py-3.5 text-5xl ring-offset-transparent placeholder:font-medium focus:border-2 focus:ring-transparent ${fieldErrors.tel ? 'border-[#bc8070] bg-[#1f203f] focus:border-[#bc8070]' : 'border-[#878797] bg-transparent focus:border-[#878797]'}`}
                                    labelClassName="hidden"
                                />
                                <EnhancedInput
                                    type="text"
                                    id="role"
                                    placeholder="Клиент/партнер/соискатель"
                                    variant={
                                        formData.role?.trim() !== '' && fieldErrors.role
                                            ? 'contacts_page_error_desktop'
                                            : 'contacts_page_desktop'
                                    }
                                    size="contacts_page_desktop"
                                    rounded="rounded_53"
                                    value={formData.role}
                                    onChange={(value) => handleChange('role', value)}
                                    validate={(value) => {
                                        const validation = validateRoleDesktop(value)
                                        updateFieldError('role', !validation.status)
                                        return validation
                                    }}
                                    className={'focus:border-2 focus:border-[#FFFFFF]'}
                                />
                            </div>
                            <EnhancedTextareaDesktop
                                name="message"
                                id="message"
                                placeholder="Опишите свой вопрос*"
                                variant={fieldErrors.message ? 'contacts_page_error_desktop' : 'contacts_page_desktop'}
                                size="contacts_page_desktop"
                                rounded="rounded_33"
                                value={formData.message}
                                onChange={(value) => handleChange('message', value)}
                                validate={(value) => {
                                    const validation = validateTextareaDesktop(value)
                                    updateFieldError('message', !validation.status)
                                    return validation
                                }}
                            />
                            <div className="mt-4 flex flex-col justify-between">
                                {formError && (
                                    <p className={cn('text-5xl', 'error-form-desktop-custom')}>{formError}</p>
                                )}
                                <div className="mt-5 flex items-center justify-between 2xl:justify-start 2xl:gap-10">
                                    <Button
                                        variant="send_btn_desktop"
                                        size="contacts_btn_send_desktop"
                                        type="submit"
                                        disabled={isSubmitDisabled}
                                        className={cn(
                                            isSubmitDisabled &&
                                                'button-border-desktop border-2 3xl:text-4xl rounded-[50px] text-[20px] font-semibold text-white  2xl:text-3xl disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#878789] disabled:bg-none disabled:text-[#CBD6EF] disabled:opacity-100 disabled:hover:bg-none',
                                        )}
                                    >
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
    )
}

export default ContactsDesktop
