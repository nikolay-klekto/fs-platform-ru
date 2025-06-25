'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIconMobi } from '@/components/assets/iconsMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="sm_xl:p-[15px]">
                <div
                    className="mx-auto flex h-[540px] w-full flex-col justify-between rounded-b-[40px] pb-[20px] md:h-[688px] md:rounded-b-none md:p-[18.5px_9px_100px_9px]"
                    style={{
                        backgroundImage:
                            "linear-gradient(180deg, #0e0e28 0%, #10102ef4 21%, #14143ab0 53%, #211f5e 100%), url('/background/bgMobi.jpg')",
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                >
                    <HeaderMobi disableBackground={true} />
                    <div className="md:px-[11px]">
                        <div className="min-w-[70%] max-w-[90%] md:w-full">
                            <h1 className="sm_xl:text-[2rem] sm_l:text-[1.875rem] sm_s:text-[1.875rem] mb:mb-20px w-full font-normal uppercase leading-[60px] text-white sm:text-[2rem] md:pb-[20px] md:text-[clamp(2rem,10vw,4rem)]">
                                Помогаем пройти стажировку
                            </h1>
                            <p className="w-4/5 text-[0.875rem] font-medium text-white md:text-[clamp(1rem,5vw,1.5rem)]">
                                В интересующей профессии и компании, независимо от наличия опыта и навыков
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto flex w-fit items-center justify-center md:mx-0">
                        <Link href="/professions">
                            <Button variant="accent_mobi" size="wide_mobi">
                                <span className="bg-gradient-desktop sm_s:p-[14px] bg-clip-text px-[20px] text-[1.125rem] font-semibold text-transparent sm:px-[10px] md:px-[clamp(20px,5vw,70px)] md:text-[clamp(0.7rem,5vw,1.875rem)]">
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
        </>
    )
}
export default HeaderMainMobi
