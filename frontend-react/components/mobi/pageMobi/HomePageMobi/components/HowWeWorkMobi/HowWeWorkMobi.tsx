'use client'

import React from 'react'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'
import { content } from './contentHowWeWorkMobi/content'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <section className="max-w-full px-[15px] pt-[62px] md:px-[26px] md:pt-[60px]">
            <h2 className="text32px_mobi sm_xl:mb-[24px] sm_l:mb-[24px] sm_s:mb-[24px] mb-[40px] font-medium uppercase text-white sm:mb-[24px] md:mb-[15px]">
                Как мы работаем
            </h2>
            <div className="relative md:px-5">
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
                    <div className="mb-[90px] md:mb-[160px]">
                        <div
                            className="absolute bottom-[-50px] left-0 flex h-[180px] w-full items-end justify-center bg-[#353652] md:bottom-[-90px] md:h-[300px]"
                            style={{
                                background:
                                    'linear-gradient(to bottom, rgba(16, 16, 48, 0.2) 0%, rgba(16, 16, 48, 0.8) 30%,  rgba(16, 16, 48, 1) 100%)',
                            }}
                        >
                            <Button
                                onClick={() => setShowList(false)}
                                variant="select_mobi"
                                size="home_select_mobi"
                                className="w-1/2 border-[3px] text-[15px] font-medium"
                            >
                                <span className="text-[15px] md:text-[clamp(20px,4vw,26px)]">Развернуть</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
export default HowWeWorkMobi
