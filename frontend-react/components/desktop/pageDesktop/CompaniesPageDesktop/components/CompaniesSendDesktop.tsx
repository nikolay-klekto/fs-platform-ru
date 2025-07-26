'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { useModal } from '@/context/ContextModal'

const CompaniesSendDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [useRequest, setUseRequest] = useState('')
    const { openModal } = useModal()
    const [emptyInputError, setEmptyInputError] = useState(false)

    const handleClick = (): void => {
        if (useRequest.trim() !== '') {
            openModal('modal_company_notify_desktop', 'desktop')
        } else {
            setEmptyInputError(true)
        }
    }

    const handleChange = (value: string): void => {
        setUseRequest(value)
        setEmptyInputError(false)
    }

    return (
        <div className="relative z-[2] flex flex-col gap-[80px]">
            <div className="text36px_desktop mx-auto text-center font-medium uppercase">
                <p>ХОТИТЕ ПОРАБОТАТЬ В ДРУГОЙ КОМПАНИИ? ДАЙТЕ НАМ ЗНАТЬ!</p>
            </div>
            <div className="justify-bitween mx-auto flex items-center gap-[45px]">
                <EnhancedInput
                    type="text"
                    value={useRequest}
                    onChange={handleChange}
                    variant={'gradient_desktop'}
                    size={'gradient_desktop'}
                    rounded={'full'}
                    className={`${isFocused ? 'bg-[#101030]' : 'bg-transparent'} transition-none`}
                    wrapperClassName={`justify-bitween 4xl:w-[750px] 3xl:w-[700px] relative flex h-[64px] w-[800px] rounded-[50px] p-[3px] 2xl:w-[600px] ${isFocused ? 'bg-gradient-desktop border-none' : 'border-[3px] border-[#878797] bg-transparent'} ${emptyInputError ? 'border-[#bc8070]' : ''}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Button
                    variant={'send_btn_desktop'}
                    size={'send_btn_desktop'}
                    className="3xl:text-4xl 2xl:text-3xl"
                    onClick={handleClick}
                >
                    Отправить
                </Button>
            </div>
        </div>
    )
}
export default CompaniesSendDesktop
