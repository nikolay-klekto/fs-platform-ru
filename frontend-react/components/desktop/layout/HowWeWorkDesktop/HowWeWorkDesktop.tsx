'use client'
import React from 'react'
import { content } from './content'
import TitleDesktop from '../../shared/TitleDesktop'
const HowWeWorkDesktop: React.FC = () => {
    return (
        <>
            <div className="container py-[100px]">
                <div className="mb-[122px]">
                    <TitleDesktop title="Как мы работаем" href="#" />
                </div>
                <div className="flex flex-row items-center gap-10">
                    {content.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex min-h-64 w-[414px] flex-col items-center rounded-[22px] bg-[#ffffff1a] px-5 pt-[80px] text-center"
                        >
                            <div className="3xl:top-[-40px] absolute top-[-50px] rounded-full border-8 border-[#101030] 2xl:top-[-40px]">
                                <div className="bg-gradient-desktop 3xl:size-[75px] flex size-[85px] items-center justify-center rounded-full bg-[#101030] 2xl:size-[70px]">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text28px_desktop text-gradient_desktop_custom relative mb-[12px] font-medium uppercase">
                                {item.title}
                            </h3>
                            <div className="text18px_desktop text-center font-medium text-[#878797]">
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
