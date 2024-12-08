'use client'
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { EnhancedTextarea } from '../../shared/TextareaDesktop'
import { validateNameDesktop } from '../../commonDesktop/validate/validateNameDesktop'
import { validateEmailDesktop } from '../../commonDesktop/validate/validateEmailDesktop'
import { validatePhoneNumberDesktop } from '../../commonDesktop/validate/validatePhoneNumberDesktop'
import { validateRoleDesktop } from '../../commonDesktop/validate/validateRoleDesktop'
import { validateTextareaDesktop } from '../../commonDesktop/validate/validateTextareaDesktop'
import { contentContactsDesktop, contentSocialContactsDesktop } from './contentContactsDesktop'

interface FormData {
    name: string
    email: string
    tel: string
    role?: string
    message: string
}

const ContactsDesktop: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null)

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
        message: false,
    })

    const [formError, setFormError] = React.useState('')

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setFormError('')
        setFieldErrors({
            name: false,
            email: false,
            tel: false,
            message: false,
        })

        const formElement = formRef.current
        if (formElement) {
            let errors = Array.from(formElement.querySelectorAll('span.text-destructive'))

            errors = errors.filter((error) => {
                const previousElement = error.previousElementSibling
                return !(
                    previousElement &&
                    previousElement instanceof HTMLInputElement &&
                    previousElement.id === 'role' &&
                    previousElement.value === ''
                )
            })

            if (errors.length > 0) return
        }

        const newFieldErrors = {
            name: formData.name.trim() === '',
            email: formData.email.trim() === '',
            tel: formData.tel.trim() === '',
            message: formData.message.trim() === '',
        }

        setFieldErrors(newFieldErrors)

        const hasErrors = Object.values(newFieldErrors).some((error) => error)
        console.log('hasErrors ', hasErrors)

        if (hasErrors) {
            setFormError('Заполните обязательные поля')
            return
        }

        setFormError('')
        console.log('Форма отправлена:', formData)
    }

    return (
        <>
            <div className="flex justify-between pt-52 pb-[297px] 2xl:max-w-[1190px] 2xl:flex-col 2xl:items-center 2xl:mx-auto 2xl:pt-28 2xl:pb-36">
                <div className="flex flex-col gap-7 max-w-[541px] mr-32 3xl:mr-20 2xl:self-start 2xl:max-w-none 2xl:mb-28 2xl:mr-0">
                    <h2 className="text-26xl font-semibold uppercase 3xl:text-23xl">Cвяжитесь с нами</h2>
                    <Button variant="select_desktop" size="contacts_btn_desktop">
                        Хочу в команду
                    </Button>
                </div>
                <div className="w-[1020px] 2xl:flex 2xl:flex-col  2xl:w-none 2xl:w-full">
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
                                <a key={item.id} href={item.href} className="flex items-center gap-5 max-w-[376px]">
                                    <div>
                                        <div className="flex items-center justify-center w-[58px] h-[62px] rounded-full bg-gradient-desktop hover:bg-gradient-desktop-hover">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <p className="text-7xl font-medium">{item.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-white/50 rounded-full mt-[99px] mb-[63px]"></div>
                    <div>
                        <h3 className="text-20xl font-semibold uppercase">Напишите нам</h3>
                        <form onSubmit={handleSubmit} ref={formRef} noValidate>
                            <div className="flex justify-between pb-12 pt-14">
                                <div className="flex flex-col gap-[23px]">
                                    <EnhancedInput
                                        type="text"
                                        id="name"
                                        placeholder="Имя*"
                                        variant={fieldErrors.name ? 'contacts_page_error' : 'contacts_page'}
                                        size="contacts_page"
                                        rounded="contacts_page"
                                        value={formData.name}
                                        onChange={(value) => handleChange('name', value)}
                                        validate={(value) => validateNameDesktop(value)}
                                        wrapperClassName={'h-[73px]'}
                                    />
                                    <EnhancedInput
                                        type="email"
                                        id="email"
                                        placeholder="E-mail*"
                                        variant={fieldErrors.email ? 'contacts_page_error' : 'contacts_page'}
                                        size="contacts_page"
                                        rounded="contacts_page"
                                        value={formData.email}
                                        onChange={(value) => handleChange('email', value)}
                                        validate={(value) => validateEmailDesktop(value)}
                                        wrapperClassName={'h-[73px]'}
                                    />
                                </div>
                                <div className="flex flex-col gap-[23px] pl-3">
                                    <EnhancedInput
                                        type="tel"
                                        id="tel"
                                        placeholder="Телефон*"
                                        variant={fieldErrors.tel ? 'contacts_page_error' : 'contacts_page'}
                                        size="contacts_page_additional_info"
                                        rounded="contacts_page"
                                        value={formData.tel}
                                        onChange={(value) => handleChange('tel', value)}
                                        validate={(value) => validatePhoneNumberDesktop(value)}
                                        wrapperClassName={'h-[73px]'}
                                    />
                                    <EnhancedInput
                                        type="text"
                                        id="role"
                                        placeholder="Клиент/партнер/соискатель"
                                        variant="contacts_page"
                                        size="contacts_page_additional_info"
                                        rounded="contacts_page"
                                        value={formData.role}
                                        onChange={(value) => handleChange('role', value)}
                                        validate={(value) => validateRoleDesktop(value)}
                                        wrapperClassName={'h-[73px]'}
                                    />
                                </div>
                            </div>
                            <EnhancedTextarea
                                name="message"
                                id="message"
                                placeholder="Опишите свой вопрос*"
                                variant={fieldErrors.message ? 'contacts_page_error' : 'contacts_page'}
                                size="contacts_page"
                                rounded="contacts_page"
                                value={formData.message}
                                onChange={(value) => handleChange('message', value)}
                                validate={(value) => validateTextareaDesktop(value)}
                                wrapperClassName={'h-64'}
                            />
                            {formError && <p className={cn('text-xs', 'text-destructive')}>{formError}</p>}
                            <div className="flex justify-between pt-[50px]">
                                <Button variant="select_desktop" size="contacts_btn_send_desktop">
                                    Отправить
                                </Button>
                                <p className="max-w-[663px] pl-3 text-white/20 text-[17px] font-medium">
                                    Нажимая кнопку “Отправить”, я даю согласие на обработку своих персональных данных и
                                    соглашаюсь с Условиями использования и Политикой конфиденциальности
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsDesktop
