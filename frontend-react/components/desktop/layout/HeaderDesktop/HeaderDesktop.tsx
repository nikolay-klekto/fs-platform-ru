import React from 'react'
import Image from 'next/image'

import Logo from '@/components/desktop/shared/logo/Logo'
import HeaderNavigationDesktop from './HeaderNavigationDesktop'
import { ShoppingCartIcon, ProfileIcon } from '@/components/asssets/icons'
import { Button } from '@/components/ui/button'

const HeaderDesktop: React.FC = () => {
    return (
        <>
            <header
                className="relative flex justify-center pt-[34px] pb-[35px] px-[59px] bg-[rgba(16,16,48,0.7)] border border-red-500 border-solid"
                style={{
                    backgroundImage: 'url(/background/colorBackground.png)',
                    backgroundSize: 'cover',
                }}
            >
                <div className="absolute inset-0 bg-[rgba(16,16,48,0.7)]"></div>
                <div className="relative w-full max-w-[1800px] flex items-center justify-between z-10 border border-red-500 border-solid">
                    <div className="mr-[50px] 4xl:mr-[10px]">
                        <Logo width={59} height={58} textSize={'4xl'} />
                    </div>
                    <div className="flex gap-[32px] 4xl:gap-[20px]">
                        <HeaderNavigationDesktop />
                        <Button variant="header_desktop_btn_gradient" size="header_btn">
                            Заказать звонок
                        </Button>
                    </div>
                    <div className="flex gap-[50px] ml-[50px] 4xl:ml-[10px] 4xl:gap-[30px]">
                        <ShoppingCartIcon className="flex-shrink-0 w-[50px] h-[50px] 4xl:w-[40px] 4xl:h-[40px]" />
                        <ProfileIcon className=" flex-shrink-0 w-[50px] h-[50px] 4xl:w-[40px] 4xl:h-[40px]" />
                    </div>
                </div>
            </header>
        </>
    )
}

/*
<div className="flex gap-[32px]">
                        <HeaderNavigationDesktop />
                        <Button variant="header_desktop_btn_gradient" size="header_btn">
                            Заказать звонок
                        </Button>
                    </div>
*/

/*
<div className="flex items-center gap-[3rem]">
                        <ShoppingCartIcon className="flex-shrink-0" />
                        <ProfileIcon className=" flex-shrink-0" />
                    </div>
*/

/*
<Button variant="gradient" size="custom" className="text-7.5xl text-white">
*/

/*
<div className="flex flex-col justify-center items-center mr-[58px] border border-red-500 border-solid">
                        <Image src="/images/logo.png" alt="logo" width={58} height={58} />
                        <p className="text-white text-4xl font-semibold">FUN SCRUT</p>
                    </div>
*/
export default HeaderDesktop
