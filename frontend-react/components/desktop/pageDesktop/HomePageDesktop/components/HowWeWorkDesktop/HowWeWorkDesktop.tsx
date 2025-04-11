'use client'
import React from 'react'
import { content } from './contentHowWeWorkDesktop/content'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
const HowWeWorkDesktop: React.FC = () => {
    return (
        <>
            <div className="container py-[100px]">
                <div className="mb-[122px]">
                    <TitleDesktop title="Как мы работаем" href="#" />
                </div>
                <div className="flex items-center justify-between gap-[clamp(20px,_2vw,_40px)]">
                    {content.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex h-[264px] w-[418px] flex-col items-center rounded-[22px] bg-[#ffffff1a] px-[20px] pt-[80px] text-center 2xl:h-[250px] 2xl:pt-[60px]"
                        >
                            <div className="3xl:top-[-40px] absolute top-[-50px] rounded-full border-8 border-[#101030] 2xl:top-[-40px]">
                                <div className="bg-gradient-desktop 3xl:size-[75px] flex size-[85px] items-center justify-center rounded-full bg-[#101030] 2xl:size-[70px]">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text28px_desktop text-gradient_desktop_custom relative mb-[10px] font-medium uppercase">
                                {item.title}
                            </h3>
                            <div className="text18px_desktop text-center font-medium leading-tight text-[#878797]">
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
