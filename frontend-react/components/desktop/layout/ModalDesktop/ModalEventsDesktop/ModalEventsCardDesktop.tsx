import React from 'react'

interface ModalEventsCardDesktopProps {
    icon: React.ReactElement;
    title: string | React.ReactElement
    info?: string | React.ReactElement
    link?: string
    className?: string
}
const ModalEventsCardDesktop: React.FC<ModalEventsCardDesktopProps> 
= ({ icon, title, info, link, className }) => (
        <div 
            className={`flex items-center gap-[20px] relative max-w-[417px] max-h-[162px] rounded-[25px] bg-[#1F203F] pt-[40px] pb-[46px] pl-[20px] ${className}`}  
            >
            <div>
                {icon}
            </div>
            <div>
                <h4 className="text28px_desktop text-[white] font-medium leading-[34px] mb-[15px]">{title}</h4>
                {link 
                    ? 
                    <a 
                        className="text-[22px] text-[#878797] font-semibold leading-[27px] hover:text-[#382D90] transition-colors duration-300" 
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        >{info}
                    </a> 
                    : 
                    <p className="text-[22px] text-[#878797] font-semibold leading-[27px]">{info}</p>}
            </div>
        </div>
    )

export default ModalEventsCardDesktop