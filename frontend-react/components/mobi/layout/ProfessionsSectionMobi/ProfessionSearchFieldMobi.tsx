import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EnhancedInput } from '@/components/ui/input'
import { ForwardIcon } from '@/components/assets/icons'

const ProfessionSearchFieldMobi: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    /*для отправки запроса профессии*/
    const [useRequest, setUseRequest] = useState('')

    const handleSendRequest = () => {
        console.log('Отправка запроса на профессию:', useRequest)
        setUseRequest('')
    }

    return (
        <div className=" flex flex-col">
            <p className=" sm_xl:text-4xl sm_l:text-3xl sm_s:text-3xl mx-auto mb-[30px] text-[20px] font-semibold text-white sm:text-3xl md:text-5xl">
                Предложите, в какой ещё профессии вы бы ещё хотели попробовать себя
            </p>
            <div className="mx-auto flex h-[44px] w-full gap-[7px] md:max-w-[470px]">
                <EnhancedInput
                    type="text"
                    value={useRequest}
                    onChange={(value) => setUseRequest(value)}
                    variant={'search_mobi'}
                    size={'send_mobi'}
                    rounded={'rounded_50'}
                    wrapperClassName=" w-full md:max-w-[450px]"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Button variant={'select_mobi'} size={'gradient_circle_mobi'}>
                    <ForwardIcon />
                </Button>
            </div>
        </div>
    )
}
export default ProfessionSearchFieldMobi
