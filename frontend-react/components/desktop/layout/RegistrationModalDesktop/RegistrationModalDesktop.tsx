'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'

interface RegistrationFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
    subscribe: boolean
    agree: boolean
}

interface RegistrationModalDesktopProps {
    // triggerOpen?: (openModal: () => void) => void
    closeModal: () => void
    openLoginModal: () => void
}
const RegistrationModalDesktop: React.FC<RegistrationModalDesktopProps> = ({ closeModal, openLoginModal }) => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
        agree: false,
    })
    const [showModal, setShowModal] = useState(false)

    const handleOpen = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleChange = (field: keyof RegistrationFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Валидацию добавить CЮДА!!!!
        // if (formData.password !== formData.confirmPassword) {
        //     alert('Пароли не совпадают');
        //     return;
        // }

        console.log('Данные формы:', formData)
        // handleClose()
        closeModal()
    }

    return (
        <div className="flex justify-center">
            <Modal show={true} onClose={closeModal} size="medium">
                <h2 className="mb-1 text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent uppercase">
                    Регистрация
                </h2>
                <form onSubmit={handleSubmit}>
                    <EnhancedInput
                        label="Почта"
                        type="email"
                        placeholder="Почта"
                        value={formData.email}
                        onChange={(value) => handleChange('email', value)}
                        required
                    />
                    <EnhancedInput
                        label="Номер телефона"
                        type="tel"
                        placeholder="+375(__)___-__-__"
                        value={formData.phone}
                        onChange={(value) => handleChange('phone', value)}
                        required
                    />
                    <EnhancedInput
                        label="Пароль"
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={(value) => handleChange('password', value)}
                        required
                    />
                    <EnhancedInput
                        label="Повторите пароль"
                        type="password"
                        placeholder="Повторите пароль"
                        value={formData.confirmPassword}
                        onChange={(value) => handleChange('confirmPassword', value)}
                        required
                    />
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            id="subscribe"
                            type="checkbox"
                            checked={formData.subscribe}
                            onChange={(e) => handleChange('subscribe', e.target.checked)}
                        />
                        <label htmlFor="subscribe" className="text-2xl font-medium text-[#878797]">
                            Подписаться на рассылку
                        </label>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            id="agree"
                            type="checkbox"
                            checked={formData.agree}
                            onChange={(e) => handleChange('agree', e.target.checked)}
                            required
                        />
                        <label htmlFor="agree" className="text-2xl font-medium text-[#878797]">
                            Согласен с условиями использования
                        </label>
                    </div>
                    <div>
                        <p className="text-[#878797]">
                            Защита от спама reCAPTCHA.{' '}
                            <Link href="/contacts" target="_blank" rel="noopener noreferrer" className="underline">
                                Конфиденциальность
                            </Link>{' '}
                            и{' '}
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                                Условия использования
                            </Link>
                        </p>
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        className="px-20 mx-auto bg-gradient-desktop text-5xl font-semibold rounded-full py-8 mt-1 hover:bg-gradient-desktop-hover"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className="flex justify-center">
                    <p>Уже зарегистрированы?</p>
                    <button className="underline bg-transparent border-transparent" onClick={openLoginModal}>
                        Войти в аккаунт
                    </button>
                    {/* <Link href="#" className="underline">
                        Войти в аккаунт
                    </Link> */}
                </div>
            </Modal>
        </div>
    )
}

export default RegistrationModalDesktop
