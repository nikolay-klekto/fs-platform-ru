import React, { useState, useRef } from 'react'
import { ChevronLeftIconMobi, AttachFileIconMobi } from '@/components/assets/iconsMobi'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'

interface IFormData {
    name: string
    phoneNumber: string
    profession: string
    consent: boolean
}

const JoinTeamMobi: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phoneNumber: '',
        profession: '',
        consent: false,
    })

    const [errors, setErrors] = useState<{
        name: boolean
        phoneNumber: boolean
        profession: boolean
        consent: boolean
        fileError: string | null
    }>({
        name: false,
        phoneNumber: false,
        profession: false,
        consent: false,
        fileError: null,
    })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }
    const MAX_FILE_SIZE_MB = 0.005
    const ALLOWED_FILE_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const isFileSizeValid = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
        if (!isFileSizeValid) {
            setErrors((prev) => ({ ...prev, fileError: 'Файл слишком большой. Максимальный размер 5MB.' }))
            return
        }

        const isFileTypeValid = ALLOWED_FILE_TYPES.includes(file.type)
        if (!isFileTypeValid) {
            setErrors((prev) => ({ ...prev, fileError: 'Неверный формат файла. Разрешены только PDF, DOC, DOCX.' }))
            return
        }

        setSelectedFile(file)
        setErrors((prev) => ({ ...prev, fileError: null }))
    }

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            phoneNumber: !formData.phoneNumber.trim(),
            profession: !formData.profession.trim(),
            consent: !formData.consent,
            fileError: null,
        }

        setErrors(newErrors)

        return !Object.values(newErrors).some(Boolean)
    }

    const handleBlur = (field: keyof IFormData) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: !formData[field],
        }))
    }

    const handleChange = (field: keyof IFormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: field === 'consent' ? value === 'true' : value,
        }))

        setErrors((prev) => ({
            ...prev,
            [field]: field === 'consent' ? !(value === 'true') : !value.trim(),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return

        const cleanedPhone = normalizePhone(formData.phoneNumber)
    }

    const normalizePhone = (value: string) => {
        return value.replace(/[^\d+]/g, '')
    }

    const renderErrors = () => {
        const hasFieldErrors = errors.name || errors.phoneNumber || errors.profession || errors.consent
        const hasFileError = !!errors.fileError

        return (
            <>
                {hasFieldErrors && (
                    <p className="mb-4 text-sm font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        Заполните обязательные поля
                    </p>
                )}
                {hasFileError && (
                    <p className="mb-4 text-sm font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        {errors.fileError}
                    </p>
                )}
                {!hasFieldErrors && !hasFileError && (
                    <p className="mb-4 text-sm font-medium leading-[100%] tracking-normal text-[#353652]">
                        *Обязательное поле для ввода
                    </p>
                )}
            </>
        )
    }

    return (
        <main className="px-[15px] pb-[100px] pt-[20px]">
            <div className="mb-5 flex items-center gap-4 p-[10px]">
                <ChevronLeftIconMobi />
                <h2 className="text-7xl font-medium uppercase leading-[100%] tracking-normal text-white">
                    Хотите работать у нас?
                </h2>
            </div>
            <p className="treacking-[0] mb-7 text-3xl leading-[100%] text-[#878797]">
                Заполните поля – и мы с вами свяжемся
            </p>
            <form className="max-w-[500px]">
                <EnhancedInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onBlur={() => handleBlur('name')}
                    onChange={handleChange('name')}
                    className={`mb-[12px] h-10 w-full items-center rounded-[50px] border-2 bg-transparent pl-4 text-xl font-medium text-white placeholder:text-2xl placeholder:text-[#353652] focus-visible:ring-offset-0 ${
                        errors.name ? 'border-[#bc8070]' : 'border-[#878797]'
                    } `}
                    label="Ваше имя*"
                    labelClassName="font-semibold text-[10px] text-white leading-[100%] tracking-normal"
                    placeholder="Ваше имя"
                    wrapperClassName="w-full"
                />
                <PhoneInputMobi
                    value={formData.phoneNumber}
                    className={`mb-[12px] mt-0 items-center border-2 pl-4 placeholder:text-2xl ${errors.phoneNumber ? 'border-[#bc8070]' : 'border-2 border-[#878797]'}`}
                    onBlur={() => handleBlur('phoneNumber')}
                    onChange={handleChange('phoneNumber')}
                    onError={() => {}}
                    labelClassName="font-semibold text-[10px] text-white leading-[100%] tracking-normal mb-[0px]"
                    showInternalError={false}
                />
                <EnhancedInput
                    type="text"
                    name="profession"
                    value={formData.profession}
                    className={`mb-[10px] h-10 w-full items-center rounded-[50px] border-2 bg-transparent pl-4 text-xl font-medium text-white placeholder:text-2xl placeholder:text-[#353652] focus-visible:ring-offset-0 ${
                        errors.profession ? 'border-[#bc8070]' : 'border-[#878797]'
                    } `}
                    onBlur={() => handleBlur('profession')}
                    onChange={handleChange('profession')}
                    label="Укажите профессию*"
                    labelClassName="font-semibold text-[10px] text-white leading-[100%] tracking-normal"
                    placeholder="Укажите вашу профессию"
                    wrapperClassName="w-full"
                />
                <div>{renderErrors()}</div>
                <div className="mb-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={openFileDialog}
                        className="bg-gradient-desktop hover:bg-gradient-desktop-hover flex size-[27px] items-center justify-center rounded-full"
                    >
                        <AttachFileIconMobi className="text-white" />
                    </button>
                    {selectedFile ? (
                        <p className="text-base font-semibold leading-[100%] tracking-normal text-[#FFFFFF]">
                            Файл прикреплен
                        </p>
                    ) : (
                        <p className="text-base font-semibold leading-[100%] tracking-normal text-[#FFFFFF]">
                            Прикрепите резюме
                        </p>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                    />
                </div>
                <div className="mb-3">
                    <EnhancedInput
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onBlur={() => handleBlur('consent')}
                        onChange={handleChange('consent')}
                        label="Я согласен(а) на обработку персональных данных"
                        labelClassName={`text-[12px] font-medium ${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                        checkboxIconSize="w-[14px]"
                    />
                </div>
                {errors.consent ? (
                    <p className="mb-3 text-base font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        Подтвердите согласие на обработку данных
                    </p>
                ) : (
                    ''
                )}
                <p className="mb-7 text-base font-medium leading-[100%] tracking-normal text-[#353652]">
                    Защита от спама reCAPTCHA{' '}
                    <a href="/example" className="leading-[100%] underline underline-offset-2">
                        Конфиденциальность
                    </a>{' '}
                    и
                    <a href="/example" className="leading-[100%] underline underline-offset-2">
                        {' '}
                        Условия использования
                    </a>
                </p>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant={'header_mobi_btn_gradient'}
                    size={'join_team_btn_mobi'}
                    disabled={Object.values(errors).some(Boolean)}
                    className={`*:treacking-0 block text-xl font-semibold leading-[100%] ${Object.values(errors).some(Boolean) ? 'bg-[#878797] disabled:opacity-100' : 'bg-gradient-mobi hover:bg-gradient-mobi-hover'}`}
                >
                    Оставить заявку
                </Button>
            </form>
        </main>
    )
}

export default JoinTeamMobi
