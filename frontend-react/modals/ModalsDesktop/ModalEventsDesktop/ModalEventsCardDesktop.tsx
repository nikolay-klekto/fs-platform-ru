import React from 'react'

interface IModalEventsCardDesktop {
    icon: React.ReactElement
    title: string | React.ReactElement
    info?: string | React.ReactElement
    link?: string
    style?: React.CSSProperties
    className?: string
}
const ModalEventsCardDesktop: React.FC<IModalEventsCardDesktop> = ({ icon, title, info, link, style, className }) => (
    <div
        className={`relative flex max-h-[162px] max-w-[417px] gap-[20px] rounded-[25px] bg-[#1F203F] pb-[46px] pl-[20px] pt-[40px] ${className}`}
        style={style}
    >
        <div>{icon}</div>
        <div>
            <h4 className="text28px_desktop mb-[15px] font-medium leading-[34px] text-[white]">{title}</h4>
            {link ? (
                <a
                    className="text-[22px] font-semibold leading-[27px] text-[#878797] transition-colors duration-300 hover:text-[#382D90]"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {info}
                </a>
            ) : (
                <p className="text-[22px] font-semibold leading-[27px] text-[#878797]">{info}</p>
            )}
        </div>
    </div>
)

export default ModalEventsCardDesktop
