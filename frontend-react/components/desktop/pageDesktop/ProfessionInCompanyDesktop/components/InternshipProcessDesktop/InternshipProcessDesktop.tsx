'use client'

import React from 'react'
import { content } from './contentInternshipProcessDesktop/content'

const InternshipProcessDesktop: React.FC = () => {
    return (
        <div className="flex justify-between gap-x-[67px] pl-[26px] pr-[23px]">
            {content.map((item) => (
                <div key={item.id} className="flex w-[409px] flex-col items-start border-t border-white">
                         <div className="flex h-[233px] items-start overflow-visible">
                        <p className='bg-gradient-desktop  bg-clip-text pr-[0.1em] text-[200px] font-thin leading-[233px] -tracking-widest text-transparent '>
                            {item.number}
                        </p>

                    </div>
                    <p className="text24px-desktop whitespace-pre-line pl-[13px] text-start font-semibold tracking-[0.045em] text-white">
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default InternshipProcessDesktop
