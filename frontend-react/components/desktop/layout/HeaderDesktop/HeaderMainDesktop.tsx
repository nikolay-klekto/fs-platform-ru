'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import FunscrutLogo from './FunscrutLogo'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'

const HeaderMainDesktop: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <>
            <div className="flex w-[55vw] flex-col mb-[7vw] 3xl:mb-[0]">
                <div className="3xl:mb-[4.25rem] mb-[6.25rem] lg:mb-8 xl:mb-12 2xl:mb-14">
                    <FunscrutLogo />
                    <p className="text-[clamp(18px,_1.5vw,_32px)] font-medium text-white ">
                        Помогаем пройти стажировку в интересующей профессии и компании, независимо от наличия опыта и
                        навыков
                    </p>
                </div>
                <Link href="/professions">
                    <div
                        className="inline-flex items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Button
                            variant="accent_desktop"
                            size="wide_desktop"
                            className={`${isHovered ? 'button-shadow_around_desktop_custom' : ''}`}
                        >
                            <span className="gradient-text-mobi-custom">Выбрать профессию</span>
                        </Button>
                        <Button
                            variant="accent_desktop"
                            size="circle_desktop"
                            className={`${isHovered ? 'button-shadow_right_desktop_custom' : ''}`}
                        >
                            <ForwardIcon className="lg:h-[18px] lg:w-[21px] xl:h-[21px] xl:w-[24px]" />
                        </Button>
                    </div>
                </Link>
            </div>
        </>
    )
}
export default HeaderMainDesktop
