'use client'
import React from 'react'
import { content } from './content'

const HowWeWork: React.FC = () => {
    return (
        <div className="bg-bgblock pl-16 pr-16 pt-24 pb-24 ">
            <h2 className="text-white text-title-size uppercase font-medium pb-[122px]">как мы работаем</h2>
            <div className="flex flex-row items-center gap-10">
                {content.map((item) => (
                    <div
                        key={item.id}
                        className="min-h-64 bg-[#ffffff1a] rounded-[22px] pl-5 pr-5 pt-[80px] flex-1  flex flex-col items-center text-center relative"
                    >
                        <div className="bg-gradient-blue w-24 h-24 flex justify-center items-center rounded-full absolute top-[-40px] border-[10px] border-bgblock  ">
                            {item.icon}
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
    )
}
export default HowWeWork
