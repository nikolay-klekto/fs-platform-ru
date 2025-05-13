'use client'
import { useState } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { validateNameDesktop } from '@/components/desktop/commonDesktop/validate/validateNameDesktop'
import { validateSurnameDesktop } from '@/components/desktop/commonDesktop/validate/validateSurnameDesktop'
import { validateCityDesktop } from '@/components/desktop/commonDesktop/validate/validateCityDesktop'
import { validateEmailDesktop } from '@/components/desktop/commonDesktop/validate/validateEmailDesktop'
import content from '../contentProfilePageDesktop/content'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import Dropdown from './ProfileSelectDesktop'

interface IFormData {
    name: string
    dateOfBirth: string
    monthOfBirth: string
    yearOfBirth: string
    tel: string
    education: string
    surname: string
    city: string
    email: string
    employment: string
}

function ProfileFormDesktop() {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        dateOfBirth: '',
        monthOfBirth: '',
        yearOfBirth: '',
        tel: '',
        education: '',
        surname: '',
        city: '',
        email: '',
        employment: '',
    })

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        dateOfBirth: false,
        monthOfBirth: false,
        yearOfBirth: false,
        tel: false,
        education: false,
        surname: false,
        city: false,
        email: false,
        employment: false,
    })

    const [emptyFields, setEmptyFields] = useState({
        name: false,
        dateOfBirth: false,
        monthOfBirth: false,
        yearOfBirth: false,
        tel: false,
        surname: false,
        email: false,
    })

    const [formError, setFormError] = useState(false)
    const [dataCorrect, setDataCorrect] = useState(false)

    const handleChange = (field: keyof IFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        setFieldErrors({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            education: false,
            surname: false,
            city: false,
            email: false,
            employment: false,
        })

        setEmptyFields({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            surname: false,
            email: false,
        })
    }

    const updateFieldError = (field: keyof IFormData, hasError: boolean) => {
        setFieldErrors((prev) => ({
            ...prev,
            [field]: hasError,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(false)

        const newEmptyFields = {
            name: formData.name.trim() === '',
            dateOfBirth: formData.dateOfBirth.trim() === '',
            monthOfBirth: formData.monthOfBirth.trim() === '',
            yearOfBirth: formData.yearOfBirth.trim() === '',
            tel: formData.tel.trim() === '',
            surname: formData.surname.trim() === '',
            email: formData.email.trim() === '',
        }
        setEmptyFields(newEmptyFields)

        const hasEmptyField = Object.values(newEmptyFields).some((error) => error)
        if (hasEmptyField) {
            setFormError(true)
            return
        }

        const hasErrors = Object.values(fieldErrors).some((error) => error)
        if (hasErrors) {
            setFormError(true)
            return
        }

        setFieldErrors({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            education: false,
            surname: false,
            city: false,
            email: false,
            employment: false,
        })

        setEmptyFields({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            surname: false,
            email: false,
        })

        setFormError(false)
        setDataCorrect(true)
        console.log('Форма отправлена:', formData)
    }

    const handleCancel = () => {
        setFormError(false)

        setFormData({
            name: '',
            dateOfBirth: '',
            monthOfBirth: '',
            yearOfBirth: '',
            tel: '',
            education: '',
            surname: '',
            city: '',
            email: '',
            employment: '',
        })

        setFieldErrors({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            education: false,
            surname: false,
            city: false,
            email: false,
            employment: false,
        })

        setEmptyFields({
            name: false,
            dateOfBirth: false,
            monthOfBirth: false,
            yearOfBirth: false,
            tel: false,
            surname: false,
            email: false,
        })
    }

    const onBlur = (field: keyof IFormData) => {
        if (formData[field].trim() === '') {
            setEmptyFields((prev) => ({
                ...prev,
                [field]: true,
            }))
        } else {
            setEmptyFields((prev) => ({
                ...prev,
                [field]: false,
            }))
        }
    }

    return (
        <div className="flex justify-center pt-[81px] pb-[199px]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[30px] rounded-[50px] bg-[#272745] pt-[43px] px-[32px] pb-[41px] max-w-[948px]"
            >
                <div className="self-center relative">
                    <div className="flex justify-center bg-[#878797] rounded-full w-[150px] h-[150px]">
                        <Image src="/images/avatar.png" width={71} height={77} alt="avatar" className="self-center" />
                    </div>
                    <div className="flex justify-center w-[39px] h-[39px] absolute bottom-0 right-0">
                        <button className="self-center">
                            <Image src="/images/plus-circle.png" width={32.5} height={32.5} alt="avatar" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between gap-[32px]">
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="name"
                                className={`label_profile_desktop_custom ${
                                    !formData.name ? 'text-[#FFFFFF]' : 'text-[#878797]'
                                }`}
                            >
                                Имя*
                            </label>
                            <EnhancedInput
                                type="text"
                                id="name"
                                placeholder="Имя"
                                variant={`${
                                    !emptyFields.name
                                        ? !formData.name
                                            ? 'profile_page_desktop'
                                            : 'profile_page_filled_input_desktop'
                                        : 'profile_page_error_desktop'
                                }`}
                                size="profile_page_desktop"
                                rounded="rounded_50"
                                value={formData.name}
                                onChange={(value) => handleChange('name', value)}
                                onBlur={() => onBlur('name')}
                                validate={(value) => {
                                    const validation = validateNameDesktop(value)
                                    updateFieldError('name', !validation.status)
                                    return validation
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="birth"
                                className={`label_profile_desktop_custom ${
                                    !formData.dateOfBirth || !formData.monthOfBirth || !formData.yearOfBirth
                                        ? 'text-[#FFFFFF]'
                                        : 'text-[#878797]'
                                }`}
                            >
                                Дата рождения*
                            </label>
                            <div className="flex justify-between">
                                <Dropdown
                                    options={content.dates}
                                    selectedOption={formData.dateOfBirth}
                                    onChange={(value) => handleChange('dateOfBirth', value)}
                                    className={`w-[96px] ${
                                        !emptyFields.dateOfBirth
                                            ? !formData.dateOfBirth
                                                ? 'border-[#878797]'
                                                : 'border-[#878797] bg-[#353652] text-white'
                                            : 'border-[#bc8070]'
                                    }`}
                                    onBlur={() => onBlur('dateOfBirth')}
                                />
                                <Dropdown
                                    options={content.months}
                                    selectedOption={formData.monthOfBirth}
                                    onChange={(value) => handleChange('monthOfBirth', value)}
                                    className={`w-[171px] ${
                                        !emptyFields.monthOfBirth
                                            ? !formData.monthOfBirth
                                                ? 'border-[#878797]'
                                                : 'border-[#878797] bg-[#353652] text-white'
                                            : 'border-[#bc8070]'
                                    }`}
                                    onBlur={() => onBlur('monthOfBirth')}
                                />
                                <Dropdown
                                    options={content.years}
                                    selectedOption={formData.yearOfBirth}
                                    onChange={(value) => handleChange('yearOfBirth', value)}
                                    className={`w-[118px] ${
                                        !emptyFields.yearOfBirth
                                            ? !formData.yearOfBirth
                                                ? 'border-[#878797]'
                                                : 'border-[#878797] bg-[#353652] text-white'
                                            : 'border-[#bc8070]'
                                    }`}
                                    onBlur={() => onBlur('yearOfBirth')}
                                />
                            </div>
                        </div>
                        <PhoneInputDesktop
                            value={formData.tel}
                            required={true}
                            onChange={(value) => handleChange('tel', value)}
                            onBlur={() => onBlur('tel')}
                            onError={() => setFieldErrors((prev) => ({ ...prev, tel: true }))}
                            labelClassName={`${!formData.tel ? 'text-[#FFFFFF]' : 'text-[#878797]'}`}
                            className={`bg-transparent h-[50px] px-[20px] py-[14px] mt-[0px] focus:bg-transparent placeholder:text-4xl
                               ${
                                   !emptyFields.tel
                                       ? !formData.tel
                                           ? 'border-[#878797]'
                                           : 'text-[#ffffff] bg-[#353652] border-[#878797]'
                                       : 'bg-transparent border-[#bc8070]'
                               }
                                `}
                        />
                        <Dropdown
                            options={content.education}
                            selectedOption={formData.education}
                            onChange={(value) => handleChange('education', value)}
                            label="Образование"
                        />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="surname"
                                className={`label_profile_desktop_custom ${
                                    !formData.surname ? 'text-[#FFFFFF]' : 'text-[#878797]'
                                }`}
                            >
                                Фамилия*
                            </label>
                            <EnhancedInput
                                type="text"
                                id="surname"
                                placeholder="Фамилия"
                                variant={
                                    !emptyFields.surname
                                        ? !formData.surname
                                            ? 'profile_page_desktop'
                                            : 'profile_page_filled_input_desktop'
                                        : 'profile_page_error_desktop'
                                }
                                size="profile_page_desktop"
                                rounded="rounded_50"
                                value={formData.surname}
                                onChange={(value) => handleChange('surname', value)}
                                onBlur={() => onBlur('surname')}
                                validate={(value) => {
                                    const validation = validateSurnameDesktop(value)
                                    updateFieldError('surname', !validation.status)
                                    return validation
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="city"
                                className={`label_profile_desktop_custom ${
                                    !formData.city ? 'text-[#FFFFFF]' : 'text-[#878797]'
                                }`}
                            >
                                Город
                            </label>
                            <EnhancedInput
                                type="text"
                                id="city"
                                placeholder="Город"
                                variant={!formData.city ? 'profile_page_desktop' : 'profile_page_filled_input_desktop'}
                                size="profile_page_desktop"
                                rounded="rounded_50"
                                value={formData.city}
                                onChange={(value) => handleChange('city', value)}
                                validate={(value) => {
                                    const validation = validateCityDesktop(value)
                                    updateFieldError('city', !validation.status)
                                    return validation
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label
                                htmlFor="email"
                                className={`label_profile_desktop_custom ${
                                    !formData.email ? 'text-[#FFFFFF]' : 'text-[#878797]'
                                }`}
                            >
                                Почта*
                            </label>
                            <EnhancedInput
                                type="text"
                                id="email"
                                placeholder="Почта"
                                variant={
                                    !emptyFields.email
                                        ? !formData.email
                                            ? 'profile_page_desktop'
                                            : 'profile_page_filled_input_desktop'
                                        : 'profile_page_error_desktop'
                                }
                                size="profile_page_desktop"
                                rounded="rounded_50"
                                value={formData.email}
                                onChange={(value) => handleChange('email', value)}
                                onBlur={() => onBlur('email')}
                                validate={(value) => {
                                    const validation = validateEmailDesktop(value)
                                    updateFieldError('email', !validation.status)
                                    return validation
                                }}
                            />
                        </div>
                        <Dropdown
                            options={content.employment}
                            selectedOption={formData.employment}
                            onChange={(value) => handleChange('employment', value)}
                            label="Занятость"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <p
                        className={`text-2xl mb-[4px] ${!Object.values(emptyFields).some((error) => error) ? 'text-[#353652]' : 'text-[#BC8070]'}`}
                    >
                        *Обязательное поле для ввода
                    </p>
                    <div className="flex justify-end gap-[39px]">
                        <Button
                            variant="cancel_btn_profile_desktop"
                            size="cancel_btn_profile_desktop"
                            onClick={() => {
                                handleCancel()
                            }}
                        >
                            {dataCorrect ? 'Редактировать' : 'Отменить изменения'}
                        </Button>
                        <Button variant="save_btn_profile_desktop" size="save_btn_profile_desktop">
                            Сохранить
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileFormDesktop
