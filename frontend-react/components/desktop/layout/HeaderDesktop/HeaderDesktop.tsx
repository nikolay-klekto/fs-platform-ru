import React from 'react'
import Image from 'next/image'

import { ShoppingCartIcon, ProfileIcon } from '@/components/asssets/icons'
import { Button } from '@/components/ui/button'
//import fontSizeConfig from '@/tailwind-config/fontSizeConfig'

const HeaderDesktop: React.FC = () => {
    //style={{ fontSize: fontSizeConfig['7.5xl'] }}
    return (
        <>
            <header
                className="flex"
                style={{
                    backgroundImage: 'url(/background/colorBackground.png)',
                    backgroundSize: 'cover',
                }}
            >
                <Image src="/images/logo.png" alt="logo" width={58} height={58} />
                <Button variant="gradient" size="custom" className="text-7.5xl text-white">
                    Заказать звонок
                </Button>
                <ShoppingCartIcon />
                <ProfileIcon />
            </header>
        </>
    )
}
export default HeaderDesktop
