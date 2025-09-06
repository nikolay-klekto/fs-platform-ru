'use client'
import React, { useRef } from 'react'
import { content } from './ItemProfessionsInCompanyDesktop/contentProfessionsDesktop/content'
import ItemProfessionsInCompanyDesktop from './ItemProfessionsInCompanyDesktop/ItemProfessionsInCompanyDesktop'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const InternshipProfessionsDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <>
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll"
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
            <div className="mb-[120px] mt-[92px] w-full">
                <div
                    ref={scrollbarRef}
                    className="scrollbar_custom relative mx-auto w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div className="absolute h-2" style={{ width: `${scrollContentWidth}px` }}></div>
                </div>
            </div>
        </>
    )
}

export default InternshipProfessionsDesktop
