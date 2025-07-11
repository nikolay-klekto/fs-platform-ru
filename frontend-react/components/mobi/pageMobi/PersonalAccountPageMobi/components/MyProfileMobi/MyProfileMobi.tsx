'use client'

import React, { useCallback, useState } from "react";
import { Button } from '@/components/ui/button'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import { EnhancedInput } from "@/components/ui/input";
import { validateEmailMobi } from "@/components/mobi/commonMobi/validate/validateEmailMobi";
import AvatarMobi from '@/components/mobi/shared/AvatarMobi/AvatarMobi';
import { CalendarIconsMobi, ChevronDownIconMobi } from '@/components/assets/iconsMobi';
import DatePickerCalendar from "@/components/mobi/shared/CalendarProfileMobi/CalendarProfileMobi";

interface IFormData {
    name: string
    surname: string
    birthDate: string
    phone: string
    email: string
    education: string
    occupation: string // добавляю поле занятости
    consent: boolean
    avatar?: string
}

interface ISelectOption {
    value: string
    label: string
}

const educationOptions: ISelectOption[] = [
    { value: 'higher', label: 'Высшее' },
    { value: 'higher_not-finished', label: 'Высшее незаконченное' },
    { value: 'general_secondary', label: 'Общее среднее' },
    { value: 'secondary_special', label: 'Среднее специальное' },
    { value: 'secondary_not-finished', label: 'Среднее незаконченное' },
];

const occupationOption: ISelectOption[] = [
    { value: 'full', label: 'Полная' },
    { value: 'underemployment', label: 'Неполная' },
    { value: 'part-time', label: 'Частичная' },
    { value: 'smth', label: 'Такая-то' },
]

const MyProfileMobi: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        surname: '',
        birthDate: '',
        phone: '',
        email: '',
        education: '',
        occupation: '', // добавляю поле занятости
        consent: false,
        avatar: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [inputTouched, setInputTouched] = useState<{ [key in keyof IFormData]?: boolean }>({});
    const [inputInternalErrors, setInputInternalErrors] = useState<{ [key: string]: string | null }>({
        email: '',
        phone: '',
        education: '',
    });

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEducationFocused, setIsEducationFocused] = useState(false);
    const [isOccupationOpen, setIsOccupationOpen] = useState(false); // для занятости
    const [isOccupationFocused, setIsOccupationFocused] = useState(false); // для занятости

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };


    const handleConfirmDate = (newDate: string) => {
        setFormData((prev) => ({ ...prev, birthDate: newDate }));
        setIsCalendarOpen(false);
    };

    const handleCancelDate = () => {
        setIsCalendarOpen(false);
    };

    const handleInputBlur = (field: keyof IFormData) => {
        setInputTouched((prev) => ({ ...prev, [field]: true }));

        if (field === 'email') {
            const validation = validateEmailMobi(formData.email);
            handleError('email', validation.textError);
        }

        if ((field === 'name' || field === 'surname') && !formData[field]) {
            setErrors((prev) => ({ ...prev, [field]: 'Обязательное поле' }));
        }
    };

    const handleError = (field: string, error: string | null) => {
        setInputInternalErrors((prev) => ({ ...prev, [field]: error }));
    };

    const validateForm = useCallback((): boolean => {
        const requiredFields: (keyof IFormData)[] = ['name', 'surname', 'birthDate', 'phone', 'email', 'education'];
        const hasEmptyFields = requiredFields.some(field => !formData[field]);
        const hasErrors = Object.values(inputInternalErrors).some(error => error);

        if (!formData.education) {
            setErrors(prev => ({ ...prev, education: 'Обязательное поле' }));
        }

        return !(hasEmptyFields || hasErrors);
    }, [formData, inputInternalErrors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
    };

    const handleAvatarChange = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                avatar: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="py-[20px] w-full flex justify-center">
            <form onSubmit={handleSubmit}
                className="flex flex-col justify-start bg-[#1F203F] rounded-[40px] px-[15px] gap-[30px] py-[35px] max-w-[400px] w-full">
                <div className="flex flex-col items-center gap-6">
                    <AvatarMobi
                        imageUrl={formData.avatar}
                        onImageChange={handleAvatarChange}
                    />
                </div>
                <div className="flex flex-col justify-start gap-[25px]">
                    <div className="flex flex-col">
                        <label htmlFor="surname"
                            className="text14px_mobi text-[#878797] mb-1 text-2xl bg-transparent font-medium">Имя*</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={() => handleInputBlur('name')}
                            className={`input-form-mobi-custom border-2 h-[44px] text14px_mobi ${errors.name && inputTouched.name ? 'border-[#BC8070]' : ''}`}
                            placeholder="Ваше имя"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="surname"
                            className="text14px_mobi mb-1 text-2xl font-medium text-[#878797] ">Фамилия*</label>
                        <input
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            onBlur={() => handleInputBlur('surname')}
                            className={`input-form-mobi-custom h-[44px] border-2 ${errors.surname && inputTouched.surname ? 'border-[#BC8070]' : ''}`}
                            placeholder="Ваша фамилия"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="birthDate" className="mb-1 text-2xl font-medium text-[#878797]">Дата
                            рождения</label>
                        <div
                            className="input-form-mobi-custom flex h-[44px] items-center gap-1 rounded-[42px] border-2 border-[#878797] px-3"
                            onClick={() => setIsCalendarOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setIsCalendarOpen(true);
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
                                className="w-full border-none bg-transparent text-[#878797] text-[16px] outline-none placeholder:text-gray-500"
                                placeholder="__.__.____"
                                type="text"
                                readOnly
                            />
                        </div>
                        {isCalendarOpen && (
                            <DatePickerCalendar
                                value={formData.birthDate || `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`}
                                onConfirm={handleConfirmDate}
                                onCancel={handleCancelDate}
                            />
                        )}
                    </div>
                    <PhoneInputMobi
                        labelClassName='text-[#878797]'
                        value={formData.phone}
                        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                        onError={(error) => handleError('phone', error)}
                        wrapperClassName="w-full"
                        required={true}
                        className='h-[44px] border-2'
                    />
                    <form noValidate className='flex w-full flex-col gap-1.5 w-full'>
                        <EnhancedInput
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={formData.email}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => {
                                setIsEmailFocused(false);
                                handleInputBlur('email');
                            }}
                            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                            className={`${isEmailFocused ? '!bg-[#353652]' : ''} ${inputTouched.email && validateEmailMobi(formData.email).styleError
                                ? 'border-[#878797]'
                                : 'border-[#878797]'
                                } h-[44px] border-2 w-full rounded-[20px] bg-transparent p-3 text-xl font-medium`}
                            label="Почта*"
                            labelClassName="mb-1 text-2xl font-medium text-[#878797]"
                            wrapperClassName="w-full"
                        />
                        {inputInternalErrors.email && (
                            <p className="error-form-mobi-custom !text-[#bc8070]">{inputInternalErrors.email}</p>
                        )}
                    </form>
                    <div className="flex flex-col">
                        <label htmlFor="education"
                            className="text14px_mobi mb-1 text-2xl font-medium text-[#878797]">Образование</label>
                        <div className="relative">
                            <div
                                className={`input-form-mobi-custom flex h-[44px] text-[14px] border-2 items-center justify-between cursor-pointer
${isEducationOpen || isEducationFocused ? 'border-white' : errors.education ? 'border-[#bc8070]' : 'border-[#878797]'}`}
                                style={isEducationOpen || isEducationFocused ? {
                                    backgroundColor: '#353652',
                                    borderColor: 'white'
                                } : {}}
                                onClick={() => setIsEducationOpen(!isEducationOpen)}
                                onFocus={() => setIsEducationFocused(true)}
                                onBlur={() => setIsEducationFocused(false)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setIsCalendarOpen(true);
                                    }
                                }}
                                role="button"
                            >
                                <span className={formData.education ? 'text-[#878797]' : 'text-[#878797]'}>
                                    {formData.education
                                        ? educationOptions.find(opt => opt.value === formData.education)?.label
                                        : 'образование'}
                                </span>
                                <ChevronDownIconMobi
                                    className={`h-[15px] w-[27px] transition-transform duration-200 ${isEducationOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                            {isEducationOpen && (
                                <div className="absolute z-50 w-full mt-1 rounded-[20px] p-[2px]"
                                    style={{
                                        background: 'linear-gradient(90deg, #1F203F)',
                                    }}>
                                    <div
                                        className="flex flex-col gap-1 rounded-[20px] bg-[#1F203F] border p-3 border-[#878797]">
                                        {educationOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setIsCalendarOpen(true);
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                className={`cursor-pointer py-[10px] px-[7px] text-[14px] font-medium border-b border-[#878797] last:border-b-0 ${formData.education === option.value
                                                    ? 'text-white'
                                                    : 'bg-transparent text-[#878797]'
                                                    }`}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, education: option.value }));
                                                    setIsEducationOpen(false);
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
                        <label htmlFor="occupation"
                            className="text14px_mobi mb-1 text-2xl font-medium text-[#878797]">Занятость</label>
                        <div className="relative">
                            <div
                                className={`input-form-mobi-custom flex h-[44px] text-[14px] border-2 items-center justify-between cursor-pointer
${isOccupationOpen || isOccupationFocused ? 'border-white' : 'border-[#878797]'}`}
                                style={isOccupationOpen || isOccupationFocused ? {
                                    backgroundColor: '#353652',
                                    borderColor: 'white'
                                } : {}}
                                onClick={() => setIsOccupationOpen(!isOccupationOpen)}
                                onFocus={() => setIsOccupationFocused(true)}
                                onBlur={() => setIsOccupationFocused(false)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setIsOccupationOpen(true);
                                    }
                                }}
                                role="button"
                            >
                                <span className={formData.occupation ? 'text-[#878797]' : 'text-[#878797]'}>
                                    {formData.occupation
                                        ? occupationOption.find(opt => opt.value === formData.occupation)?.label
                                        : 'занятость'}
                                </span>
                                <ChevronDownIconMobi
                                    className={`h-[15px] w-[27px] transition-transform duration-200 ${isOccupationOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                            {isOccupationOpen && (
                                <div className="absolute z-50 w-full mt-1 rounded-[20px] p-[2px]"
                                    style={{
                                        background: 'linear-gradient(90deg, #1F203F)',
                                    }}>
                                    <div
                                        className="flex flex-col gap-1 rounded-[20px] bg-[#1F203F] border p-3 border-[#878797]">
                                        {occupationOption.map((option) => (
                                            <div
                                                key={option.value}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setIsOccupationOpen(true);
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                className={`cursor-pointer py-[10px] px-[7px] text-[14px] font-medium border-b border-[#878797] last:border-b-0 ${formData.occupation === option.value
                                                    ? 'text-white'
                                                    : 'bg-transparent text-[#878797]'
                                                    }`}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, occupation: option.value }));
                                                    setIsOccupationOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <p className={`mt-4 text-sm font-medium leading-[18px] text-[#878797]`}>
                                *Обязательное поле для ввода
                            </p>
                        </div>
                    </div>
                </div>
                <Button type="submit" variant="select_mobi" className="text-[17px] h-[56px]">Сохранить</Button>
            </form>
        </div>
    );
};

export default MyProfileMobi;
