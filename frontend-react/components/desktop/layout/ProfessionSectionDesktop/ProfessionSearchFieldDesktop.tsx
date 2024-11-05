import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProfessionSearchFieldDesktop: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-35xl 2xl:gap-30xl ">
            <p className=" text-[36px] uppercase">В какой ещё профессии вы бы хотели попробовать себя?</p>
            <div className="flex items-center gap-[45px]">
                <Input />
                <Button />
            </div>
        </div>
    )
}
export default ProfessionSearchFieldDesktop
