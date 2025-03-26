import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'

const ProfessionSendDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [useRequest, setUseRequest] = useState('')

    const handleSendRequest = () => {
        setUseRequest('')
    }
    return (
        <div className="relative z-[2] flex flex-col gap-[36px]">
            <div className="text36px_desktop mx-auto text-center font-medium uppercase">
                <p>Вас интересуют другие профессии?</p>
                <p>Напишите, и мы найдем стажировку для вас</p>
            </div>
            <div className="justify-bitween mx-auto flex items-center gap-[45px]">
                <EnhancedInput
                    type="text"
                    value={useRequest}
                    onChange={(value) => setUseRequest(value)}
                    variant={'gradient_desktop'}
                    size={'gradient_desktop'}
                    rounded={'full'}
                    className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                    wrapperClassName={`justify-bitween 4xl:w-[750px] 3xl:w-[700px] relative flex h-[64px] w-[800px] rounded-[50px] p-[3px] 2xl:w-[600px] ${isFocused ? 'border-[3px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Button
                    variant={'send_btn_desktop'}
                    size={'send_btn_desktop'}
                    className="3xl:text-4xl 2xl:text-3xl"
                    onClick={handleSendRequest}
                >
                    Отправить
                </Button>
            </div>
        </div>
    )
}
export default ProfessionSendDesktop
