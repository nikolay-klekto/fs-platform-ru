'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import { content } from './ItemProfessionsInCompanyDesktop/contentProfessionsDesktop/content'
import ItemProfessionsInCompanyDesktop from './ItemProfessionsInCompanyDesktop/ItemProfessionsInCompanyDesktop'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const ProfessionsInCompanyDesktop: React.FC = () => {
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
                    <Link href={`/profession`} key={item.id}>
                        <ItemProfessionsInCompanyDesktop
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            onWidthChange={() => {}}
                        />
                    </Link>
                ))}
            </div>
            <div
                ref={scrollbarRef}
                className="scrollbar_custom relative mx-auto mb-[73px] mt-[80px] w-[65%] cursor-pointer overflow-x-scroll 2xl:mb-[60px] 3xl:mb-[70px]"
            >
                <div
                    className="absolute h-2 min-w-[1000px] bg-transparent"
                    style={{ width: `${scrollContentWidth}px` }}
                ></div>
            </div>
        </>
    )
}

export default ProfessionsInCompanyDesktop
