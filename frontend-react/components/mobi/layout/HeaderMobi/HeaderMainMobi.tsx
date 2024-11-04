'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div
                className="md:px-[10px] mx-auto flex h-[80vh] w-full flex-col rounded-b-[40px] pb-[20px] justify-end"
                style={{
                    backgroundImage:
                        "linear-gradient(180deg, #0e0e28 0%, #10102ef4 21%, #14143ab0 53%, #211f5e 100%), url('/bgMobi.jpg')",
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="md:w-[70%] sm_xl:w-[80%] sm_l:w-[85%] sm:w-[90%]">
                    <p className="leading-[40px] w-full md:text-[34px] sm_xl:text-[32px] sm_l:text-[30px] sm:text-[28px] uppercase text-white md:pb-[20px]">
                        Помогаем пройти стажировку
                    </p>
                    <p className="w-full pb-[40px] text-[14px] font-medium text-white">
                        В интересующей профессии и компании, независимо от наличия опыта и навыков
                    </p>
                </div>
                <Link href="/professions">
                    <div className="flex items-center justify-center">
                        <Button variant="accent_mobi" size="wide_mobi">
                            <span className="bg-gradient-desktop bg-clip-text text-[18px] font-semibold text-transparent">
                                Выбрать профессию
                            </span>
                        </Button>
                        <Button variant="accent_mobi" size="circle_mobi">
                            <ForwardIcon className="sm:h-[18px] sm:w-[21px] sm_l:h-[21px] sm_l:w-[24px]" />
                        </Button>
                    </div>
                </Link>
            </div>
        </>
    )
}
export default HeaderMainMobi
