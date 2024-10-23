'use client'
import React, { useEffect } from 'react'
import { content } from './content'

const HowWeWorkDesktop: React.FC = () => {
    useEffect(() => {
        console.log(window.screen.width < 768)
    }, [])

    return (
        <>
            {window.screen.width > 768 ? (
                <div className="bg-bgblock pl-16 pr-16 pt-24 pb-24 ">
                    <h2 className="text-left  text-white text-title-size uppercase font-medium pb-[122px] text-[88px] lg:text-[55px] md:text-[36px] lg:text-center  ">
                        как мы работаем
                    </h2>
                    <div className="flex flex-row items-center flex-wrap gap-10">
                        {content.map((item) => (
                            <div
                                key={item.id}
                                className="min-h-64 min-w-[414px] sm_xl:min-w-[] bg-[#ffffff1a] rounded-[22px] pl-5 pr-5 pt-[80px] flex-1  flex  flex-col  items-center text-center relative"
                            >
                                <div className="border-[12px] absolute top-[-40px] rounded-full border-[#101030]">
                                    <div className="bg-gradient-blue w-24 h-24 flex justify-center items-center rounded-full  border-[10px] border-bgblock bg-[#101030]">
                                        {item.icon}
                                    </div>
                                </div>
                                <h2
                                    className="relative text-[28px] font-bold uppercase mb-3"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, rgb(131, 51, 243), rgb(95, 74, 243), rgb(59, 81, 168))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {item.title}
                                </h2>
                                <div className="text-[#878797]   text-sm text-center leading-[22px]">
                                    {item.description.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-bgblock pl-16 pr-16 pt-24 pb-24 ">mobile</div>
            )}
        </>
    )
}
export default HowWeWorkDesktop
