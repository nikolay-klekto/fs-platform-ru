'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="px-[15px]">
                <div
                    className=" mx-auto flex md:h-[60vw] h-[80vh] sm:h-[95vh] w-full flex-col rounded-b-[40px] pb-[20px] justify-end"
                    style={{
                        backgroundImage:
                            "linear-gradient(180deg, #0e0e28 0%, #10102ef4 21%, #14143ab0 53%, #211f5e 100%), url('/background/bgMobi.jpg')",
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                >
                    <div className="min-w-[70%] max-w-[90%]">
                        <p className="leading-[40px] w-full  uppercase text-white md:text-[2.125rem] sm_xl:text-[2rem] sm_l:text-[1.875rem] sm:text-[1.75rem] pb-[10px] break-words">
                            Помогаем пройти стажировку
                        </p>
                        <p className="w-full pb-[40px] text-[14px] font-medium text-white break-words">
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
            </div>
        </>
    )
}
export default HeaderMainMobi

//
