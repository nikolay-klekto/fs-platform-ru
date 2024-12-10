import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'

const ProfessionSendDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [useRequest, setUseRequest] = useState('')

    const handleSendRequest = () => {
        console.log('Отправка запроса на профессию:', useRequest)
        setUseRequest('')
    }

    return (
        <div className="gap-35xl 2xl:gap-30xl flex flex-col">
            <p className="text36px_desktop 4xl:mb-[4.5rem] 3xl:mb-16 mx-auto mb-20 font-medium uppercase text-white 2xl:mb-12">
                В какой ещё профессии вы бы хотели попробовать себя?
            </p>
            <div className="justify-bitween mx-auto flex items-center gap-[45px]">
                <EnhancedInput
                    type="text"
                    value={useRequest}
                    onChange={(e) => setUseRequest(e.target.value)}
                    variant={'gradient_desktop'}
                    size={'gradient_desktop'}
                    rounded={'full'}
                    className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                    wrapperClassName={`2xl:w-[600px] relative h-[64px] w-[800px] justify-bitween flex rounded-[50px] p-[3px] ${isFocused ? 'border-[3px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Button variant={'send_btn_desktop'} size={'send_btn_desktop'} onClick={handleSendRequest}>
                    Отправить
                </Button>
            </div>
        </div>
    )
}
export default ProfessionSendDesktop
