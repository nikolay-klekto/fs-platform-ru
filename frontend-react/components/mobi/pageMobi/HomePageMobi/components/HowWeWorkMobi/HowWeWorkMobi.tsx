import React from 'react'
import SubTitleMobi from '@/components/mobi/shared/SubTitleMobi'
import { Button } from '@/components/ui/button'
import { content } from './contentHowWeWorkMobi/content'

const HowWeWorkMobi: React.FC = () => {
    const [showList, setShowList] = React.useState(true)
    return (
        <section className="sm_xl:mt-auto sm_l:mt-auto sm_s:mt-auto max-w-full px-[15px] py-[60px] sm:mt-auto">
            <h2 className="sm_xl:mb-[24px] sm_l:mb-[24px] sm_s:mb-[24px] md:text-11xl sm_xl:text-10xl sm_l:text-9xl sm_s:text-8xl mb-[40px] text-[32px] font-medium uppercase text-white sm:mb-[24px] sm:text-8xl">
                Как мы работаем
            </h2>
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
        </section>
    )
}
export default HowWeWorkMobi
