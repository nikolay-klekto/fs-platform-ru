'use client'

import React, { useRef, useEffect, useState } from 'react'
import TitleDesktop from '@/components/desktop/shared/TitleDesktop'
import Image from 'next/image'
import { useAvailableCompanies } from '@/hooks/useAvailibleCompanies'

const CompaniesSectionDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollbarWidth, setScrollbarWidth] = useState(0)
    const { companies } = useAvailableCompanies()

    const calculateScrollbarWidth = () => {
        if (!contentRef.current || !scrollbarRef.current) return 0
        return contentRef.current.scrollWidth - (contentRef.current.offsetWidth - scrollbarRef.current.offsetWidth)
    }

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll: () => void = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current && scrollbarRef.current) {
                const calculatedScrollbarWidth = calculateScrollbarWidth()
                setScrollbarWidth(calculatedScrollbarWidth)
            }
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <section className="flex flex-col gap-[80px] py-[100px]">
            <div className="mb-35xl container">
                <TitleDesktop title="Компании" href="/companies" />
            </div>
            <div className="flex flex-col overflow-x-auto pt-10">
                <div
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="no-scrollbar_custom container flex w-full justify-center select-none gap-[9vw] overflow-y-visible overflow-x-scroll px-12"
                >
                    {companies.slice(0, 10).map((item) => (
                        <div
                            className="group relative my-16 flex min-w-[160px] justify-center overflow-visible p-6"
                            key={item.id}
                        >
                            <div className="absolute inset-0 rounded-full bg-[#9653f5] opacity-0 blur-2xl transition duration-300 ease-in-out group-hover:opacity-40"></div>
                            <Image
                                src={item.logoPath}
                                alt={item.name}
                                width={104}
                                height={40}
                                className="relative z-10 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mx-auto mt-[clamp(25px,_2vw,_40px)] h-2 w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div className="h-full" style={{ width: `${scrollbarWidth}px` }}></div>
            </div>
        </section>
    )
}

export default CompaniesSectionDesktop
