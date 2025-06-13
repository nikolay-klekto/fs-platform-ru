import React, { useEffect, useRef, useState } from 'react'
import { contentInternshipProfessionsDesktop } from './contentInternshipProfessionsDesktop/content'
import ItemProfessionsDesktop from './ItemInternshipProfessionsDesktop/ItemProfessionsDesktop'

const InternshipProfessionsDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [scrollbarContentWidth, setScrollbarContentWidth] = useState(0)

    const syncScroll = (source: 'content' | 'scrollbar') => {
        if (!contentRef.current || !scrollbarRef.current) return
        const content = contentRef.current
        const scrollbar = scrollbarRef.current

        if (source === 'content') {
            scrollbar.scrollLeft = content.scrollLeft
        } else {
            content.scrollLeft = scrollbar.scrollLeft
        }
    }

    useEffect(() => {
        const update = () => {
            if (!contentRef.current) return
            const content = contentRef.current

            const needsScrollbar = content.scrollWidth > content.clientWidth
            setShowScrollbar(needsScrollbar)

            if (needsScrollbar) {
                setScrollbarContentWidth(content.scrollWidth)
            }
        }
        requestAnimationFrame(update)

        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return (
        <div className="relative">
            <div
                ref={contentRef}
                onScroll={() => syncScroll('content')}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(16px,_1.3vw,_38px)] overflow-x-auto pb-4"
            >
                {contentInternshipProfessionsDesktop.map((item) => (
                    <div key={item.id} className="shrink-0 snap-start">
                        <ItemProfessionsDesktop image={item.image} name={item.name} />
                    </div>
                ))}
            </div>

            {showScrollbar && (
                <div
                    ref={scrollbarRef}
                    onScroll={() => syncScroll('scrollbar')}
                    className="scrollbar_custom relative mb-[120px] ml-[254px] mr-[261px] mt-[92px] w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div
                        className="absolute h-2"
                        style={{
                            width: `${scrollbarContentWidth + 1}px`,
                            minWidth: '100%',
                            backgroundColor: 'transparent',
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default InternshipProfessionsDesktop
