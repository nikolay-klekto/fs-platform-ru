'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { content } from './contentPersonalAccountPageDesktop/content'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'

const PersonalAccountPageDesktop: React.FC = () => {
    const [currentComponent, setCurrentComponent] = useState<React.ReactElement | null>(null)
    const [activeId, setActiveId] = useState(1)

    const handleButtonClick = (component: React.ComponentType<{ id: number }>, id: number) => {
        const componentElement = React.createElement(component, { id })
        setCurrentComponent(componentElement)
        setActiveId(id)
    }

    useEffect(() => {
        const defaultComponentData = content.find((item) => item.id === 1)
        if (defaultComponentData) {
            const defaultComponentElement = React.createElement(defaultComponentData.component, {
                id: defaultComponentData.id,
            })
            setCurrentComponent(defaultComponentElement)
        }
    }, [])

    return (
        <>
            <HeaderDesktop />
            <div className="min-h-[60vh] grow bg-[#101030]">
                <div className="relative overflow-hidden">
                    <div className="radial-gradient_desktop left-[-369px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[50px] top-[933px]"></div>
                    <div className="container">
                        <div className="relative z-10 flex items-center pt-10">
                            <h2 className="text46px_desktop pr-[100px] font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
                            <div className="flex flex-1 justify-between">
                                {content.map((item) =>
                                    item.title === 'МОЙ ПРОФИЛЬ' ? (
                                        <Link href="/profile">
                                            <button
                                                key={item.id}
                                                className={`text18px_desktop cursor-pointer font-bold underline-offset-8 transition-all duration-300 ease-in-out
                                            ${
                                                item.id === activeId
                                                    ? 'bg-gradient-desktop bg-clip-text text-transparent underline decoration-[#6C41F3] decoration-4'
                                                    : 'hover:[#3B51A8] text-[#878797] decoration-4 hover:bg-gradient-desktop hover:bg-clip-text hover:underline'
                                            }`}
                                            >
                                                {item.title}
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            key={item.id}
                                            onClick={() => handleButtonClick(item.component, item.id)}
                                            className={`text18px_desktop cursor-pointer font-bold underline-offset-8 transition-all duration-300 ease-in-out
                                            ${
                                                item.id === activeId
                                                    ? 'bg-gradient-desktop bg-clip-text text-transparent underline decoration-[#6C41F3] decoration-4'
                                                    : 'hover:[#3B51A8] text-[#878797] decoration-4 hover:bg-gradient-desktop hover:bg-clip-text hover:underline'
                                            }`}
                                        >
                                            {item.title}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                        <div>{currentComponent}</div>
                    </div>
                </div>
            </div>
            <div />
        </>
    )
}

export default PersonalAccountPageDesktop
