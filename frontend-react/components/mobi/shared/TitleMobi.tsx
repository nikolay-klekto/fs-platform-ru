import React from 'react'
interface PropsTitleMobi {
    title: string
}

const TitleMobi: React.FC<PropsTitleMobi> = ({ title }) => {
    return <h2 className="text-11xl text-white sm:text-8xl ">{title}</h2>
}
export default TitleMobi
