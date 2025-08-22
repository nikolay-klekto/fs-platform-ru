'use client'

import React from 'react'
import { content } from './contentInternshipProcessDesktop/content'

const InternshipProcessDesktop: React.FC = () => {
    return (
        <div className="flex justify-between gap-x-[67px] pl-[58px] pr-[23px] ">
            {content.map((item) => (
                <div key={item.id} className="flex flex-col items-start w-[409px] h-[282px] border-t border-white">
                    {/* Номер */}
                    <p className="bg-gradient-desktop bg-clip-text text-center text-[200px] font-light uppercase text-transparent tracking-[-0.07em]">
                        {item.number}
                    </p>
                    {/* Текст */}
                    <p className="text24px_desktop whitespace-pre-line font-semibold text-white">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default InternshipProcessDesktop
