import React from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'
import { content } from './content'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <div className="max-w-full px-[15px] py-[60px] pt-[10px]">
            <div className="sm_l:mb-[20px] sm_s:mb-[20px] mb-[30px] sm:mb-[15px]">
                <TitleMobi title={'Как мы работаем'} href="#" />
            </div>
            <div className="relative">
                {(showList ? content.slice(0, 2) : content).map((item) => (
                    <div key={item.id}>
                        <div className="text-9xl text-[#353652]">{item.num}</div>
                        <SubTitleMobi title={item.title} />
                        <div className="flex flex-col border-b border-[#353652] pb-[20px] pt-[10px] ">
                            {item.description.map((item, index) => (
                                <span className="text-base font-medium text-[#878797]" key={index}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {showList && (
                    <div
                        className="absolute bottom-0 left-0 flex h-[100px] w-full items-end justify-center bg-[#353652]"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(16, 16, 48, 0.2) 0%, rgba(16, 16, 48, 0.8) 30%,  rgba(16, 16, 48, 1) 100%)',
                        }}
                    >
                        <Button
                            onClick={() => setShowList(false)}
                            variant="select_mobi"
                            size="select_mobi"
                            className="text-[15px] font-medium"
                        >
                            Развернуть
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default HowWeWorkMobi
