import React, { useState } from 'react'
import { EnhancedInput } from '@/components/ui/input'
import { SendIconMobi } from '@/components/assets/iconsMobi'

const ProfessionSendMobi: React.FC = () => {
    const [useRequest, setUseRequest] = useState('')

    const handleSendRequest = () => {
        console.log('Отправка запроса на профессию:', useRequest)
        setUseRequest('')
    }
    return (
        <div className="mt-[30px] flex flex-col gap-[17px]">
            <div className="text-[14px] font-medium uppercase">
                <p>Хотите поработать в другой компании?</p>
                <p>Дайте нам знать!</p>
            </div>
            <div className="justify-bitween mx-auto flex h-[34px] w-full max-w-[400px] items-center gap-[15px]">
                <EnhancedInput
                    type="text"
                    value={useRequest}
                    onChange={(value) => setUseRequest(value)}
                    variant={'search_mobi'}
                    size={'send_mobi'}
                    rounded={'rounded_20'}
                    wrapperClassName="justify-bitween h-[30px] rounded-[20px] border-box w-full border-[1.25px] border-[#878797] bg-transparent"
                />
                <SendIconMobi onClick={handleSendRequest} />
            </div>
        </div>
    )
}
export default ProfessionSendMobi
