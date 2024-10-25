import React from 'react'
import { content } from '@/components/mobi/layout/HowWeWorkMobi/content'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <div className="container">
            <div className="mb-[24px]">
                <TitleMobi title={'Как мы работаем'} />
            </div>
            <div className="relative">
                <div className=" mb-[24px]">
                    {(showList ? content.slice(0, 2) : content).map((item) => (
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
                {showList && (
                    <div
                        className="absolute bottom-0  left-0 flex h-[100px] w-full items-end justify-center bg-[#353652]"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(16, 16, 48, 0.2) 0%, rgba(16, 16, 48, 0.5) 30%,  rgba(16, 16, 48, 1) 100%)',
                        }}
                    >
                        <Button variant="select_mobi" size="select_mobi">
                            Развернуть
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default HowWeWorkMobi
