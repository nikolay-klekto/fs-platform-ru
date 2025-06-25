import React from 'react'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'
import { content } from './contentHowWeWorkMobi/content'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <div className="max-w-full px-[15px] py-[60px] sm_xl:mt-auto sm_l:mt-auto sm_s:mt-auto sm:mt-auto mt-[58px] md:mt-[117px] md:px-[26px]">
            <h2 className="sm_xl:mb-[24px] sm_l:mb-[24px] sm_s:mb-[24px] sm:mb-[24px] md:mb-[40px] mb-[40px] md:text-11xl sm_xl:text-10xl sm_l:text-9xl sm_s:text-8xl text-[32px] font-medium uppercase text-white sm:text-8xl">
                Как мы работаем
            </h2>
            <div className="relative">
                {(showList ? content.slice(0, 2) : content).map((item) => (
                    <div key={item.id}>
                        <div className="text-9xl text-[#353652] font-normal md:text-[clamp(2rem,10vw,4rem)]">
                            {item.num}
                        </div>
                        <SubTitleMobi title={item.title} />
                        <ul className="flex flex-col border-b border-[#353652] pb-[20px] pt-[10px] ">
                            {item.description.map((item, index) => (
                                <li
                                    className="text-base font-medium text-[#878797] before:content-['-'] before:mr-1 md:text-[clamp(0.5rem,4vw,1.5rem)]"
                                    key={index}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
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
