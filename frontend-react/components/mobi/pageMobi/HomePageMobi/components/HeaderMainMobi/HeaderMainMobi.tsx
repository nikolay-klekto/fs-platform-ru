'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ForwardIconMobi } from '@/components/assets/iconsMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'

const HeaderMainMobi: React.FC = () => {
    return (
        <>
            <div className="p-[15px] sm:p-[10px] md:p-0">
                <div
                    className="sm_l:justify-normal mx-auto flex h-[540px] w-full flex-col justify-between rounded-b-[40px] p-2 pb-[40px] sm_xl:h-[600px] md:h-[688px] md:rounded-b-none md:p-[18px_9px_100px_9px]"
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
                        <div className="mt-[180px] sm_s:mt-[160px] sm:mt-[140px] min-w-[70%] max-w-[90%] md:mt-0 md:w-full">
                            <h1 className="text32px_mobi">Помогаем пройти стажировку</h1>
                            <p className=" mb-8 md:mb-0 w-4/5 text-[0.875rem] font-medium text-white md:text-[clamp(1rem,5vw,1.5rem)]">
                                В интересующей профессии и компании, независимо от наличия опыта и навыков
                            </p>
                        </div>
                    </div>

                    <div className="sm_xl:mx-0 sm_l:mx-0 flex w-fit items-center justify-center md:mx-0">
                        <Link href="/professions">
                            <Button variant="accent_mobi" size="wide_mobi">
                                <span className="bg-gradient-desktop sm_s:p-[14px] bg-clip-text px-[20px] text-[18px] font-semibold text-transparent sm:px-[10px] md:px-[clamp(20px,5vw,70px)] md:text-[clamp(0.7rem,5vw,30px)]">
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
