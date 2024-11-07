import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProfessionSearchFieldDesktop: React.FC = () => {
    return (
        <div className="gap-35xl 2xl:gap-30xl flex flex-col">
            <p className="text36px_desktop mb-[5rem] 4xl:mb-[4.5rem] 3xl:mb-[4rem] 2xl:mb-[3rem] mx-auto font-medium uppercase text-white">
                В какой ещё профессии вы бы хотели попробовать себя?
            </p>
            <div className="flex items-center gap-[45px] mx-auto justify-bitween">
                <Input
                    type="text"
                    className=" h-[64px] w-[800px] 2xl:h-[58px] 2xl:w-[600px] rounded-[50px] bg-transparent px-[20px] py-0 text-11xl ring-offset-transparent text-[#878797] caret-[#878797]"
                    style={{ border: '3px solid #878797' }}
                />
                <div>
                    <Button variant={'select_desktop'} size={'gradient_border_btn'}>
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ProfessionSearchFieldDesktop
