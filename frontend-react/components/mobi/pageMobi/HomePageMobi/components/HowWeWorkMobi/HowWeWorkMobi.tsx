import React from 'react'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'
import { content } from './contentHowWeWorkMobi/content'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <div className="mt-[62px] max-w-full px-[15px] md:mt-[117px] md:px-[26px]">
            <h2 className="text32px_mobi sm_xl:mb-[24px] sm_l:mb-[24px] sm_s:mb-[24px] mb-[40px] font-medium uppercase text-white sm:mb-[24px] md:mb-[15px]">
                Как мы работаем
            </h2>
            <div className="relative px-5">
                {(showList ? content.slice(0, 2) : content).map((item) => (
                    <div key={item.id}>
                        <div className="text-9xl font-normal text-[#353652] md:text-[clamp(2rem,10vw,4rem)]">
                            {item.num}
                        </div>
                        <SubTitleMobi title={item.title} />
                        <ul className="flex flex-col border-b border-[#353652] pb-[20px] pt-[10px] ">
                            {item.description.map((item, index) => (
                                <li
                                    className="text-base font-medium text-[#878797] before:mr-1 before:content-['-'] md:text-[clamp(0.5rem,4vw,1.5rem)]"
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
                            size="home_select_mobi"
                            className="border-[3px] text-[15px] font-medium"
                        >
                            <span className="text-[15px] md:text-8xl">Развернуть</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default HowWeWorkMobi
