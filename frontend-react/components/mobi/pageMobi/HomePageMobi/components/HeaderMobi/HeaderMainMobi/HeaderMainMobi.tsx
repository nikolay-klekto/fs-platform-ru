'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIconMobi } from '@/components/assets/icons'
import HeaderMobi from './ItemHeaderMobi/HeaderMobi'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="px-[15px]">
                <div
                    className="mx-auto flex h-[540px] w-full flex-col justify-between rounded-b-[40px] pb-[20px]"
                    style={{
                        backgroundImage:
                            "linear-gradient(180deg, #0e0e28 0%, #10102ef4 21%, #14143ab0 53%, #211f5e 100%), url('/background/bgMobi.jpg')",
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                >
                    <HeaderMobi disableBackground={true} />
                    <div className="md:px-[15px]">
                        <div className="min-w-[70%] max-w-[90%]">
                            <h1 className="sm_xl:text-[2rem] sm_l:text-[1.875rem] sm_s:text-[1.875rem] w-full break-words pb-[10px] uppercase leading-[40px] text-white sm:text-[1.75rem] md:text-[2.125rem]">
                                Помогаем пройти стажировку
                            </h1>
                            <p className="w-full break-words pb-[40px] text-[0.875rem] font-medium text-white">
                                В интересующей профессии и компании, независимо от наличия опыта и навыков
                            </p>
                        </div>
                        <div className="mx-auto flex w-fit items-center justify-center md:mx-0">
                            <Link href="/professions">
                                <Button variant="accent_mobi" size="wide_mobi">
                                    <span className="bg-gradient-desktop sm_s:p-[14px] bg-clip-text px-[20px] text-[1.125rem] font-semibold text-transparent sm:px-[10px]">
                                        Выбрать профессию
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/professions">
                                <Button variant="accent_mobi" size="circle_mobi">
                                    <ForwardIconMobi
                                        fill={'url(#paint0_linear_847_15423)'}
                                        stroke={'url(#paint1_linear_847_15423)'}
                                    />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HeaderMainMobi
