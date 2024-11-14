import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ForwardIcon } from '@/components/assets/icons'

const ProfessionSearchFieldMobi: React.FC = () => {
    return (
        <div className=" flex flex-col">
            <p className=" sm_xl:text-4xl sm_l:text-3xl mx-auto mb-[30px] text-[20px] font-medium text-white md:text-5xl">
                Предложите, в какой ещё профессии вы бы ещё хотели попробовать себя
            </p>
            <div className="justify-bitween sm_xl:w-full sm_l:w-full sm_s:w-full mx-auto flex h-[44px] w-[70vw] items-center gap-[10px] sm:w-full md:w-[70vw]">
                <Input
                    type="text"
                    className="rounded-[50px] bg-transparent px-[20px] py-0 text-[#878797] caret-[#878797] ring-offset-transparent"
                    style={{ border: '2px solid #878797' }}
                />
                <div>
                    <Button variant={'select_mobi'} className="h-[44px] border-2" size={'circle_mobi'}>
                        <ForwardIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ProfessionSearchFieldMobi
