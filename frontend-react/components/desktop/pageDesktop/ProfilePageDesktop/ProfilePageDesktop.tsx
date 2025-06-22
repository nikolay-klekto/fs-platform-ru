'use client'

import React, { useState, useEffect } from 'react'
import { content } from '@/components/desktop/pageDesktop/PesronalAccountPageDesktop/contentPersonalAccountPageDesktop/content'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import { AccountNavigationDesktop } from '../../shared/AccountNavigationDesktop/AccountNavigationDesktop'

const ProfilePageDesktop: React.FC = () => {
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
            <main className="relative overflow-hidden">
                <div className="radial-gradient_desktop left-[-369px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[50px] top-[933px]"></div>
                <div className="container">
                    <div className="relative z-10 flex items-center pt-10">
                        <h2 className="text46px_desktop pr-[100px] font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
                        <div className="flex flex-1 justify-between">
                            <AccountNavigationDesktop />
                        </div>
                    </div>
                    <div>{currentComponent}</div>
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ProfilePageDesktop
