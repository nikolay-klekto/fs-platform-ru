import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProfessionSearchDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)

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
                        background: isFocused ? '#878797' : 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                    }}
                >
                    <Input
                        type="text"
                        className="focus-visible:ring-ring size-full rounded-full border-none bg-[#101030] px-[20px] py-0 text-5xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
                <div>
                    <Button
                        variant={'select_desktop'}
                        size={'gradient_border_btn'}
                        className="3xl:text-4xl 3xl:w-[250px]"
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ProfessionSearchDesktop
