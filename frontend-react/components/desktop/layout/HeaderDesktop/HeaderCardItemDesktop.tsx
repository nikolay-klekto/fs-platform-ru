'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ForwardIconDesktop } from '@/components/assets/icons'

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
        <div className="relative group">
            <Image
                src="/background/subtract-back-deck.webp"
                layout="fill"
                objectFit="cover"
                alt="Тень карточки"
                className="card-background-image_desktop rounded-[50px] absolute top-0 left-0 w-full h-full opacity-0"
            />
            <div className="card-foreground-image_desktop 3xl:min-h-[210px] 3xl:max-w-[346px] flex min-h-[260px] max-w-[426px] items-center justify-center rounded-[50px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] 2xl:min-h-[188px] 2xl:max-w-[308px]">
                <div className="flex flex-1 flex-col justify-between gap-[17px]">
                    <div className="3xl:px-7 grow px-10 2xl:px-5">
                        <div className="3xl:leading-[30px] text24px_desktop text-justify font-medium leading-[40px] 2xl:leading-[24px]">
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
                        className="absolute bottom-0 right-0 group-hover:button-shadow_right_desktop_custom"
                    >
                        <ForwardIconDesktop
                            fill="url(#paint0_linear_847_15423)"
                            stroke="url(#paint1_linear_847_15423)"
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default HeaderCardItemDesktop
