'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIconMobi } from '@/components/assets/iconsMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="p-[15px] md:p-0">
                <div
                    className="sm_l:justify-between sm_xl:h-[600px] mx-auto flex h-[540px] w-full flex-col justify-between rounded-b-[40px] p-0.5 pb-[40px] md:h-[688px] md:rounded-b-none md:p-[18px_9px_100px_9px]"
                    style={{
                        backgroundImage:
                            "linear-gradient(180deg, #0e0e28 0%, #10102ef4 21%, #14143ab0 53%, #211f5e 100%), url('/background/bgMobi.jpg')",
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                    }}
                >
                    <HeaderMobi disableBackground={true} />
                    <div className="md:px-[10px]">
                        <div className="sm_s:mt-[160px] mt-[180px] sm:mt-[140px] md:mt-0">
                            <h1 className="text32px_mobi sm_l:leading-10 w-full min-w-[70%] max-w-[90%] font-normal uppercase text-white md:max-w-full md:pb-[20px] md:leading-[60px]">
                                Помогаем пройти стажировку
                            </h1>
                            <p className="sm_l:max-w-[540px] sm_xl:max-w-[540px] sm_l:text-[0.875rem] sm_xl:text-[0.875rem] mb-8 max-w-[270px] text-base font-medium text-white md:mb-0 md:max-w-[540px] md:text-[clamp(0.875rem,4.05vw,1.5rem)]">
                                В интересующей профессии и компании, независимо от наличия опыта и навыков
                            </p>
                        </div>
                    </div>

                    <div className="sm_l:max-w-[310px] sm_xl:max-w-[310px] flex max-w-[260px] md:max-w-[540px] md:px-[11px]">
                        <Link href="/professions" className="w-full">
                            <Button variant="accent_mobi" size="wide_mobi">
                                <span className="bg-gradient-desktop sm_s:p-[14px] sm_xl:text-4xl bg-clip-text text-3xl font-semibold text-transparent sm:px-[10px]  md:text-[clamp(0.7rem,5vw,30px)]">
                                    Выбрать профессию
                                </span>
                            </Button>
                        </Link>
                        <Link href="/professions">
                            <Button variant="accent_mobi" size="circle_mobi">
                                <ForwardIconMobi
                                    fill={'url(#paint0_linear_847_15423)'}
                                    stroke={'url(#paint1_linear_847_15423)'}
                                    className="size-[22px] md:size-[37px]"
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
