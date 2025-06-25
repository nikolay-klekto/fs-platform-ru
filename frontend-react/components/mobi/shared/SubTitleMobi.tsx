import React from 'react'
interface IPropsSubTitle {
    title: string
}

const SubTitleMobi: React.FC<IPropsSubTitle> = ({ title }) => {
    return (
        <h3 className="sub-title-mobi mt-[10px] text-4xl font-semibold uppercase sm:text-3xl md:text-[clamp(2rem,10vw,3.75rem)]">
            {title}
        </h3>
    )
}
export default SubTitleMobi
