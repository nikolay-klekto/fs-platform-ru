import React from 'react'
import HeaderNavigationDesktop from './HeaderNavigationDesktop/HeaderNavigationDesktop'

const HeaderDesktop: React.FC = () => {
    return (
        <div className="w-[60%] flex justify-center align-middle p-4 bg-[#101030] mx-auto">
            {/* <header>HeaderDesktop</header> */}
            <HeaderNavigationDesktop />
        </div>
    )
}
export default HeaderDesktop
