'use client'
import React, { useRef } from 'react'
import ItemProfessionsInOtherCompanyDesktop from './ItemProfessionsInOtherCompanies/ItemProfessionsInOtherCompanies'
import { content } from './ItemProfessionsInOtherCompanies/contentProfessionInOtherCompanies/content'
 import useScrollbarSync from '@/hooks/useScrollbarSync'
 
const ProfessionsInOtherCompanyDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
   
 const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)
   
    return (
        <>
            <div
                ref={contentRef}
                className="no-scrollbar_custom container flex select-none gap-[clamp(16px,2.03vw,39px)] overflow-x-scroll pl-0 pr-[60px]"
            >
                {content.map((item) => (
                    <ItemProfessionsInOtherCompanyDesktop key={item.id} image={item.image} onWidthChange={() => {}} />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                className="scrollbar_custom relative mx-auto mt-[69px] w-[65%] cursor-pointer overflow-x-scroll 2xl:mb-[60px] 3xl:mb-[70px]"
            >
                <div
                    className="absolute h-2 min-w-[1000px] bg-transparent"
                    style={{ width: `${scrollContentWidth}px` }}
                ></div>
            </div>
        </>
    )
}

export default ProfessionsInOtherCompanyDesktop
