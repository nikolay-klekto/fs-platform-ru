import React from 'react'
interface PropsSubTitleMobi {
    title: string
}

const SubTitleMobi: React.FC<PropsSubTitleMobi> = ({ title }) => {
    return <h3 className="sub-title-mobi mt-[10px] text-4xl font-semibold uppercase sm:text-3xl  ">{title}</h3>
}
export default SubTitleMobi
