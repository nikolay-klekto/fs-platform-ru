'use client'

import React from 'react'
import { content } from './contentInternshipProcessDesktop/content'

const InternshipProcessDesktop: React.FC = () => {
    return (
        <div className="flex justify-between gap-x-[67px] pl-[26px] pr-[23px] ">
            {content.map((item) => (
                <div key={item.id} className="flex w-[409px] flex-col items-start border-t border-white">
                    <p className="bg-gradient-desktop bg-clip-text text-center text-[200px] font-light uppercase tracking-[-0.07em] text-transparent">
                        {item.number}
                    </p>
                    <p className="text24px_desktop whitespace-pre-line font-semibold text-white">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default InternshipProcessDesktop
