'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailMobi } from '@/components/mobi/commonMobi/validate/validateEmailMobi'
import AvatarMobi from '@/components/mobi/pageMobi/ProfilePageMobi/components/AvatarMobi/AvatarMobi'
import { CalendarIconsMobi, ChevronDownIconMobi } from '@/components/assets/iconsMobi'
import DatePickerCalendarMobi from '@/components/mobi/shared/CalendarProfileMobi/CalendarProfileMobi'

type MyProfileMobiProps = {
    onCancel: () => void
}

interface IFormData {
    name: string
    surname: string
    birthDate: string
    phone: string
    email: string
    city: string
    education: string
    occupation: string
    consent: boolean
    avatar?: string
}

interface ISelectOption {
    value: string
    label: string
}

interface FormData {
    name: string
    surname: string
    city: string
    email: string
    phone: string
    education: string
    occupation: string
}

const educationOptions: ISelectOption[] = [
    { value: 'higher', label: 'Высшее' },
    { value: 'higher_not-finished', label: 'Высшее незаконченное' },
    { value: 'general_secondary', label: 'Общее среднее' },
    { value: 'secondary_special', label: 'Среднее специальное' },
    { value: 'secondary_not-finished', label: 'Среднее незаконченное' },
]

const occupationOption: ISelectOption[] = [
    { value: 'full', label: 'Полная' },
    { value: 'underemployment', label: 'Неполная' },
    { value: 'part-time', label: 'Частичная' },
]

const MyProfileMobi: React.FC<MyProfileMobiProps> = ({ onCancel }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        surname: '',
        birthDate: '',
        phone: '',
        email: '',
        city: '',
        education: '',
        occupation: '',
        consent: false,
        avatar: '',
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [inputTouched, setInputTouched] = useState<{ [key in keyof IFormData]?: boolean }>({})
    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        phone: '',
        education: '',
        city: '',
    })
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isEducationOpen, setIsEducationOpen] = useState(false)
    const [isEducationFocused, setIsEducationFocused] = useState(false)
    const [isOccupationOpen, setIsOccupationOpen] = useState(false)
    const [isOccupationFocused, setIsOccupationFocused] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const modalRef = useRef<HTMLFormElement>(null)
    const educationRef = useRef<HTMLDivElement>(null)
    const occupationRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)

    const closeAllMenusExcept = (menuToKeep: 'calendar' | 'education' | 'occupation') => {
        if (menuToKeep !== 'calendar') setIsCalendarOpen(false)
        if (menuToKeep !== 'education') setIsEducationOpen(false)
        if (menuToKeep !== 'occupation') setIsOccupationOpen(false)
    }

    const closeAllMenus = () => {
        setIsCalendarOpen(false)
        setIsEducationOpen(false)
        setIsOccupationOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node

        const isInsideEducation = educationRef.current?.contains(target)
        const isInsideOccupation = occupationRef.current?.contains(target)
        const isInsideCalendar = calendarRef.current?.contains(target)

        if (!isInsideEducation && !isInsideOccupation && !isInsideCalendar) {
            closeAllMenus()
        }
    }

    useEffect(() => {
        const handleModalClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCancel()
            }
        }

        document.addEventListener('mousedown', handleModalClickOutside)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleModalClickOutside)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleCancel = () => {
        onCancel()
        setIsOpen(false)
    }

    const handleConfirmDate = (newDate: string) => {
        setFormData((prev) => ({ ...prev, birthDate: newDate }))
        setIsCalendarOpen(false)
    }

    const handleCancelDate = () => {
        setIsCalendarOpen(false)
    }

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prev) => ({ ...prev, [field]: error }))
    }

    const handleActive = () => {
        setIsActive(true)
    }

    const handleInputBlur = (field: keyof IFormData) => {
        setInputTouched((prev) => ({ ...prev, [field]: true }))

        if (field === 'email') {
            const validation = validateEmailMobi(formData.email)
            handleError('email', validation.textError)
        }

        if ((field === 'name' || field === 'surname') && !formData[field]) {
            setErrors((prev) => ({ ...prev, [field]: 'Обязательное поле' }))
        }

        if (field === 'phone' && !formData.phone) {
            setErrors((prev) => ({ ...prev, [field]: 'Обязательное поле' }))
        }
    }

    const validateForm = useCallback((): boolean => {
        const requiredFields: (keyof IFormData)[] = ['name', 'surname', 'phone', 'email', 'occupation']
        const hasEmptyFields = requiredFields.some((field) => !formData[field])
        const hasErrors = Object.values(inputInternalErrors).some((error) => error)

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                setErrors((prev) => ({ ...prev, [field]: 'Обязательное поле' }))
            }
        })

        return !(hasEmptyFields || hasErrors)
    }, [formData, inputInternalErrors])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const requiredFields: (keyof IFormData)[] = ['name', 'surname', 'phone', 'email']
        setInputTouched((prev) => {
            const updated = { ...prev }
            requiredFields.forEach((field) => {
                updated[field] = true
            })
            return updated
        })
        setIsSubmitted(true)
        if (!validateForm()) return
    }

    const handleAvatarChange = (file: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                avatar: reader.result as string,
            }))
        }
        reader.readAsDataURL(file)
    }

    const requiredFields: (keyof IFormData)[] = ['name', 'surname', 'phone', 'email']
    const hasEmptyRequired = requiredFields.some((field) => !formData[field])
    const isFieldValid = (fieldName: keyof FormData) =>
        inputTouched[fieldName] && !errors[fieldName] && formData[fieldName].trim() !== ''

    return (
        <div className="py-[20px] w-full flex justify-center">
            <form
                ref={modalRef}
                onSubmit={handleSubmit}
                className="flex flex-col justify-start bg-[#1F203F] rounded-[40px] px-[15px] gap-[24px] py-[35px] max-w-[400px] w-full"
            >
                <div className="flex flex-col items-center gap-6">
                    <AvatarMobi imageUrl={formData.avatar} onImageChange={handleAvatarChange} />
                </div>
                <div className="flex flex-col justify-start gap-[17px]">
                    <div className="flex flex-col">
                        <label
                            htmlFor="surname"
                            className="text14px_form_mobi text-[#878797] mb-1 text-2xl bg-transparent font-medium"
                        >
                            Имя*
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={() => handleInputBlur('name')}
                            className={`input-profile-mobi-custom border-2 h-[44px] text14px_mobi ${errors.name && inputTouched.name ? 'border-[#BC8070]' : ''}`}
                            style={isFieldValid('name') ? { backgroundColor: '#353652' } : {}}
                            onClick={handleActive}
                            placeholder="Ваше имя"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="surname" className="text14px_mobi mb-1 text-2xl font-medium text-[#878797] ">
                            Фамилия*
                        </label>
                        <input
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            onBlur={() => handleInputBlur('surname')}
                            className={`input-profile-mobi-custom h-[44px] border-2 ${errors.surname && inputTouched.surname ? 'border-[#BC8070]' : ''}`}
                            style={isFieldValid('surname') ? { backgroundColor: '#353652' } : {}}
                            onClick={handleActive}
                            placeholder="Ваша фамилия"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col" ref={calendarRef}>
                        <label htmlFor="birthDate" className="mb-1 text-2xl font-medium text-[#878797]">
                            Дата рождения
                        </label>
                        <div
                            className="input-profile-mobi-custom flex h-[44px] items-center gap-1 rounded-[42px] border-2 border-[#878797] px-3"
                            onClick={() => {
                                closeAllMenusExcept('calendar')
                                setIsCalendarOpen(true)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    closeAllMenusExcept('calendar')
                                    setIsCalendarOpen(true)
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <CalendarIconsMobi />
                            <input
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onBlur={() => handleInputBlur('birthDate')}
                                className="w-full border-none bg-transparent text-[white] text-[16px] outline-none placeholder:text-gray-500"
                                placeholder="__.__.____"
                                type="text"
                                readOnly
                            />
                        </div>
                        {isCalendarOpen && (
                            <DatePickerCalendarMobi onConfirm={handleConfirmDate} onCancel={handleCancelDate} />
                        )}
                    </div>
                    <PhoneInputMobi
                        labelClassName="text-2xl mb-1.5 font-medium !text-[#878797]"
                        value={formData.phone}
                        onChange={(value) => {
                            setFormData((prev) => ({ ...prev, phone: value }))
                            if (errors.phone) {
                                setErrors((prev) => ({ ...prev, phone: '' }))
                            }
                        }}
                        onBlur={() => handleInputBlur('phone')}
                        onError={(error) =>
                            setErrors((prev) => ({
                                ...prev,
                                phone: error || '',
                            }))
                        }
                        className={`
                            input-profile-mobi-custom h-[44px] w-full rounded-[20px] border-2 p-3 font-medium text-white
                            ${
                                inputTouched.phone && errors.phone
                                    ? 'border-[#bc8070] focus:border-[#bc8070]'
                                    : 'border-[#878797] focus:border-[#878797]'
                            }
                            ${isFieldValid('phone') ? 'bg-[#353652]' : 'bg-transparent'}
                        `}
                        wrapperClassName="w-full !gap-0"
                        required={true}
                    />
                    <div className="flex flex-col">
                        <label
                            htmlFor="city"
                            className="text14px_form_mobi text-[#878797] mb-1 text-2xl bg-transparent font-medium"
                        >
                            Город
                        </label>
                        <input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={() => handleInputBlur('city')}
                            className={'input-profile-mobi-custom border-2 h-[44px] text14px_form_mobi'}
                            style={isFieldValid('city') ? { backgroundColor: '#353652' } : {}}
                            onClick={handleActive}
                            placeholder="Город"
                            type="text"
                        />
                    </div>
                    <form noValidate className="flex flex-col w-full">
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={formData.email}
                            onBlur={() => {
                                handleInputBlur('email')
                            }}
                            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                            className={`input-profile-mobi-custom pt-0 mt-0 h-[44px] w-full rounded-[20px] border-2 p-3 text-xl font-medium placeholder:text-[#353652] text-white gap-0
    ${
        inputTouched.email && validateEmailMobi(formData.email).styleError
            ? 'border-[#bc8070] focus:border-[#bc8070]'
            : 'border-[#878797] focus:border-[#878797]'
    }
    ${isFieldValid('email') ? 'bg-[#353652]' : 'bg-transparent'}`}
                            label="Почта*"
                            labelClassName="mb-0 text-2xl font-medium text-[#878797]"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-mobi-custom !text-[#bc8070]">{inputInternalErrors.email}</p>
                        )}
                    </form>
                    <div className="flex flex-col">
                        <label
                            htmlFor="education"
                            className="text14px_form_mobi mb-1 text-2xl font-medium text-[#878797]"
                        >
                            Образование
                        </label>
                        <div className="relative" ref={educationRef}>
                            <div
                                className={`input-profile-mobi-custom flex h-[44px] text-[14px] border-2 items-center justify-between cursor-pointer
                               ${isEducationOpen || isEducationFocused || formData.education ? 'border-[#878797]  bg-[#353652]' : 'border-[#878797]'}`}
                                style={
                                    isEducationOpen || isEducationFocused
                                        ? {
                                              backgroundColor: '#353652',
                                              borderColor: 'white',
                                          }
                                        : {}
                                }
                                onClick={() => {
                                    closeAllMenusExcept('education')
                                    setIsEducationOpen(!isEducationOpen)
                                }}
                                onFocus={() => setIsEducationFocused(true)}
                                onBlur={() => {
                                    setIsEducationFocused(false)
                                }}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        closeAllMenusExcept('education')
                                        setIsEducationOpen(!isEducationOpen)
                                    }
                                }}
                                role="button"
                            >
                                <span
                                    className={`${formData.education || isEducationOpen || isEducationFocused ? 'text-white' : 'text-[#353652]'}`}
                                >
                                    {formData.education
                                        ? educationOptions.find((opt) => opt.value === formData.education)?.label
                                        : 'образование'}
                                </span>
                                <ChevronDownIconMobi
                                    className={`h-[11px] w-[19px] transition-transform duration-200 ${isEducationOpen ? 'rotate-180' : ''}`}
                                    open={isEducationOpen}
                                />
                            </div>
                            {isEducationOpen && (
                                <div
                                    className="absolute z-50 w-full mt-[8px] rounded-[20px] p-[2px]"
                                    style={{
                                        background: 'linear-gradient(90deg, #1F203F)',
                                    }}
                                >
                                    <div className="flex flex-col gap-1 rounded-[20px] bg-[#1F203F] border-2 p-2 border-white">
                                        {educationOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            education: option.value,
                                                        }))
                                                        setIsEducationOpen(false)
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                className={`cursor-pointer py-[7px] px-[5px] text-[14px] font-medium border-b-2 border-[#353652] last:border-b-0 ${
                                                    formData.education === option.value
                                                        ? 'text-white'
                                                        : 'bg-transparent text-[#878797]'
                                                }`}
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        education: option.value,
                                                    }))
                                                    setIsEducationOpen(false)
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="occupation"
                            className="text14px_form_mobi mb-1 text-2xl font-medium text-opacity text-[#878797]"
                        >
                            Занятость
                        </label>
                        <div className="relative" ref={occupationRef}>
                            <div
                                className={`input-profile-mobi-custom flex h-[44px] text-opacity text-[14px] border-2 items-center justify-between cursor-pointer
                                ${isOccupationOpen || isOccupationFocused || formData.occupation ? 'border-[#878797]  bg-[#353652]' : 'border-[#878797]'}`}
                                style={
                                    isOccupationOpen || isOccupationFocused
                                        ? {
                                              backgroundColor: '#353652',
                                              borderColor: 'white',
                                          }
                                        : {}
                                }
                                onClick={() => {
                                    closeAllMenusExcept('occupation')
                                    setIsOccupationOpen(!isOccupationOpen)
                                }}
                                onFocus={() => setIsOccupationFocused(true)}
                                onBlur={() => {
                                    setIsOccupationFocused(false)
                                }}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        closeAllMenusExcept('occupation')
                                        setIsOccupationOpen(!isOccupationOpen)
                                    }
                                }}
                                role="button"
                            >
                                <span
                                    className={
                                        formData.occupation || isOccupationOpen || isOccupationFocused
                                            ? 'text-white'
                                            : 'text-[#353652]'
                                    }
                                >
                                    {formData.occupation
                                        ? occupationOption.find((opt) => opt.value === formData.occupation)?.label
                                        : 'занятость'}
                                </span>
                                <ChevronDownIconMobi
                                    className={`h-[11px] w-[19px] transition-transform duration-200 ${isOccupationOpen ? 'rotate-180' : ''}`}
                                    open={isOccupationOpen}
                                />
                            </div>
                            {isOccupationOpen && (
                                <div
                                    className="absolute z-50 w-full rounded-[20px] p-[2px]"
                                    style={{
                                        background: 'linear-gradient(90deg, #1F203F)',
                                    }}
                                >
                                    <div className="flex flex-col gap-1 mt-[8px] rounded-[20px] bg-[#1F203F] border-2 p-2 border-white">
                                        {occupationOption.map((option) => (
                                            <div
                                                key={option.value}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            occupation: option.value,
                                                        }))
                                                        setIsOccupationOpen(false)
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                className={`cursor-pointer text-[14px] text-[#878797] bg-transparent font-medium py-[7px] px-[5px] border-b-2 border-[#353652] last:border-b-0 ${
                                                    formData.occupation === option.value
                                                        ? 'text-white'
                                                        : 'bg-transparent text-[#878797]'
                                                }`}
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        occupation: option.value,
                                                    }))
                                                    setIsOccupationOpen(false)
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <p
                                className="mt-4 text-sm font-medium leading-[18px]"
                                style={{ color: isSubmitted && hasEmptyRequired ? '#BC8070' : '#878797' }}
                            >
                                *Обязательное поле для ввода
                            </p>
                        </div>
                    </div>
                </div>
                <Button type="submit" variant="profile_desktop" className="!bg-[#1F203F] mt-6 h-[56px]">
                    Сохранить
                </Button>
            </form>
        </div>
    )
}

export default MyProfileMobi
