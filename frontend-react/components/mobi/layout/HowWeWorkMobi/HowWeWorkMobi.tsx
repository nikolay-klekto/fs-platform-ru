import React from 'react'
import { content } from '@/components/mobi/layout/HowWeWorkMobi/content'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'

const HowWeWorkMobi: React.FC = () => {
    return (
        <div className="container">
            <div className="mb-[24px]">
                <TitleMobi title={'Как мы работаем'} />
            </div>
            <div className="mb-[24px]">
                {content.map((item) => (
                    <div key={item.id}>
                        <div className="mt-[15px pb-[10px] pt-[20px] text-9xl text-[#353652] ">{item.num}</div>
                        <SubTitleMobi title={item.title} />
                        <div className="flex flex-col border-b border-[#353652] pb-[20px] ">
                            {item.description.map((item, index) => (
                                <span className="text- text-base text-[#878797] " key={index}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <Button variant="select_mobi" size="select_mobi">
                    Развернуть
                </Button>
            </div>
        </div>
    )
}
export default HowWeWorkMobi
