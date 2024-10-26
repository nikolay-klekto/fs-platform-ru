'use client'
import React from 'react'
import { content } from './content'

const HowWeWorkDesktop: React.FC = () => {
    return (
        <>
            <div className="bg-bgblock px-16 py-24 ">
                <h2 className="text-title-size  pb-[122px] text-left text-[88px] font-medium uppercase text-white md:text-[36px] lg:text-center lg:text-[55px]  ">
                    как мы работаем
                </h2>
                <div className="flex flex-row flex-wrap items-center gap-10">
                    {content.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex min-h-64 min-w-[414px] flex-1 flex-col items-center rounded-[22px] bg-[#ffffff1a]  px-5  pt-[80px]  text-center sm_xl:min-w-[]"
                        >
                            <div className="absolute top-[-40px] rounded-full border-[12px] border-[#101030]">
                                <div className="bg-gradient-blue border-bgblock flex size-24 items-center justify-center rounded-full  border-[10px] bg-[#101030]">
                                    {item.icon}
                                </div>
                            </div>
                            <h2
                                className="relative mb-3 text-[28px] font-bold uppercase"
                                style={{
                                    background:
                                        'linear-gradient(90deg, rgb(131, 51, 243), rgb(95, 74, 243), rgb(59, 81, 168))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {item.title}
                            </h2>
                            <div className="text-center   text-sm leading-[22px] text-[#878797]">
                                {item.description.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default HowWeWorkDesktop
