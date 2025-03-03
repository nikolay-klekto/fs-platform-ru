'use client'

import React, { useState, useEffect } from 'react'
import { content } from '@/components/desktop/layout/PersonalAccountDesktop/content'

const PersonalAccountDesktop: React.FC = () => {
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
            <div className="relative overflow-hidden">
                <div className="radial-gradient_desktop left-[-369px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[50px] top-[933px]"></div>
                <div className="container">
                    <div className="relative z-10 flex items-center pt-10">
                        <h2 className="text46px_desktop pr-[100px] font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
                        <div className="flex flex-1 justify-between">
                            {content.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleButtonClick(item.component, item.id)}
                                    className={
                                        item.id === activeId
                                            ? 'bg-gradient-desktop from-[#5F4AF3] text18px_desktop font-medium text-[#878797] decoration-transparent decoration-2 bg-clip-text text-transparent underline decoration-[#8333F3] underline-offset-8'
                                            : 'hover:bg-gradient-desktop  hover:from-[#5F4AF3]hover:[#3B51A8] text18px_desktop font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8'
                                    }
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>{currentComponent}</div>
                </div>
            </div>
        </>
    )
}

export default PersonalAccountDesktop
