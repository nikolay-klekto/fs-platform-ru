'use client'

import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'

interface HeaderCardItemDesktop {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
    currency: string
    time: string
}

const HeaderCardItemDesktop: React.FC<HeaderCardItemDesktop> = ({
    textBlack,
    textColor,
    textBlackBr,
    price,
    currency,
    time,
}) => {
    return (
        <>
            <div
                className="min-h-[260px] max-w-[426px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                style={{
                    backgroundImage: "url('/background/subtract_desk.svg')",
                    backgroundSize: 'contain, contain',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="flex flex-1 flex-col justify-between gap-[17px]">
                    <div className="3xl:pt-[26px] 3xl:px-7 grow px-10 pt-[36px] md:px-4 2xl:px-5 2xl:pt-[26px] ">
                        <div className="3xl:leading-[24px] 3xl:text-4xl text-justify text-7xl font-medium leading-[40px] md:text-2xl md:font-light md:leading-[8px] 2xl:text-4xl 2xl:leading-[24px] ">
                            {textBlack}{' '}
                            <span
                                className="bg-gradient-desktop font-bold  md:font-semibold"
                                style={{
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {textColor}{' '}
                            </span>
                            {textBlackBr}
                        </div>
                    </div>
                    <div className="3xl:pl-7 flex grow justify-between pl-10 md:pl-4 xl:pl-7 2xl:pl-5">
                        <div
                            className="bg-gradient-desktop text-5xl font-semibold md:text-2xl"
                            style={{
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            от{' '}
                            <span className="text-11xl 3xl:text-6xl font-medium md:text-3xl 2xl:text-6xl">
                                {price} {currency}/ {time}
                            </span>
                        </div>
                        <Button variant="circle" size="circleDesk" className="3xl:size-[52px] self-end 2xl:size-[52px]">
                            <ForwardIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HeaderCardItemDesktop
