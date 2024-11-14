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
                className="3xl:min-h-[210px] 3xl:max-w-[346px] flex min-h-[260px] max-w-[426px] items-center justify-center rounded-[50px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] 2xl:min-h-[188px] 2xl:max-w-[308px]"
                style={{
                    backgroundImage: "url('/background/subtract_desk.svg')",
                    backgroundSize: 'contain, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="flex flex-1 flex-col justify-between gap-[17px]">
                    <div className="3xl:px-7 grow px-10 2xl:px-5">
                        <div className="3xl:leading-[30px] 4xl:text-6xl 3xl:text-5xl text-justify text-[24px] font-medium leading-[40px] 2xl:text-4xl 2xl:leading-[24px]">
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
                    <div
                        className="bg-gradient-desktop 3xl:pl-7 pl-10 text-5xl font-semibold md:text-2xl 2xl:pl-5"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        от{' '}
                        <span className="text32px_desktop font-medium">
                            {price} {currency}/ {time}
                        </span>
                    </div>
                    <Button
                        variant="accent_desktop"
                        size="circle_desktop"
                        className="absolute bottom-0 right-0 hover:shadow-lg hover:shadow-[#3B51A8]"
                    >
                        <ForwardIcon />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardItemDesktop
