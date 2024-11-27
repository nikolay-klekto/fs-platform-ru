import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProfessionSearchDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    /*для отправки запроса профессии*/
    const [useRequest, setUseRequest] = useState('')

    const handleSendRequest = () => {
        console.log('Отправка запроса на профессию:', useRequest)
        setUseRequest('')
    }
    return (
        <div className="flex flex-col gap-[36px]">
            <div className="text36px_desktop mx-auto text-center font-medium uppercase">
                <p>Вас интересуют другие профессии?</p>
                <p>Напишите, и мы найдем стажировку ДЛЯ вас</p>
            </div>
            <div className="justify-bitween mx-auto flex items-center gap-[45px]">
                <div
                    className="4xl:w-[750px] 3xl:w-[700px] relative h-[64px] w-[800px] rounded-[50px] p-[3px]"
                    style={{
                        background: isFocused ? 'transparent' : 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                        border: isFocused ? '3px solid #878797' : 'none',
                    }}
                >
                    <Input
                        type="text"
                        value={useRequest}
                        onChange={(event) => setUseRequest(event.target.value)}
                        className={`size-full rounded-[50px] border-0 px-[20px] py-0 text-5xl outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                            isFocused ? 'bg-transparent' : 'bg-[#101030]'
                        }`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
                <Button
                    variant={'select_desktop'}
                    size={'gradient_border_btn'}
                    className="3xl:text-4xl 3xl:w-[250px]"
                    onClick={handleSendRequest}
                >
                    Отправить
                </Button>
            </div>
        </div>
    )
}
export default ProfessionSearchDesktop
