import React from 'react'
import HeaderNavigationDesktop from './HeaderNavigationDesktop/HeaderNavigationDesktop'

const HeaderDesktop: React.FC = () => {
    return (
        <div className="w-full flex justify-center align-middle p-4 bg-[#101030]">
            {/* <header>HeaderDesktop</header> */}
            <HeaderNavigationDesktop />
        </div>
    )
}
export default HeaderDesktop
