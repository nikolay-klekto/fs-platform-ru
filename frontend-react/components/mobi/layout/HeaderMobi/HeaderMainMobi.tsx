'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/asssets/icons'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="header-main_mobi_custom">
                <div className="md:w-[70%] sm_xl:w-[80%] sm_l:w-[85%] sm:w-[90%]">
                    <p className="header-main-title_mobi_custom">Помогаем пройти стажировку</p>
                    <p className="w-full pb-[40px] text-[14px] font-medium text-white">
                        В интересующей профессии и компании, независимо от наличия опыта и навыков
                    </p>
                </div>
                <Link href="/professions" passHref>
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
