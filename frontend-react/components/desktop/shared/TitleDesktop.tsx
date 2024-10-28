import React from 'react'
interface PropsTitle {
    title: string
}

const TitleDesktop: React.FC<PropsTitle> = ({ title }) => {
    return (
        <div className="relative mb-[80px] px-[47px]">
            <h2 className="text-[160px] text-white opacity-[0.030]">{title}</h2>
            <h4 className=" absolute bottom-[37px] left-[57px] text-35xl text-white">{title}</h4>
        </div>
    )
}
export default TitleDesktop
