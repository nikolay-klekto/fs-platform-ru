import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProfessionSearchDesktop: React.FC = () => {
    return (
        <div className="gap-35xl 2xl:gap-30xl flex flex-col">
            <p className="text36px_desktop 4xl:mb-[4.5rem] 3xl:mb-16 mx-auto mb-20 font-medium uppercase text-white 2xl:mb-12">
                В какой ещё профессии вы бы хотели попробовать себя?
            </p>
            <div className="justify-bitween mx-auto flex items-center gap-[45px]">
                <Input
                    type="text"
                    className=" text-11xl h-[64px] w-[800px] rounded-[50px] bg-transparent px-[20px] py-0 text-[#878797] caret-[#878797] ring-offset-transparent 2xl:h-[58px] 2xl:w-[600px]"
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
export default ProfessionSearchDesktop
